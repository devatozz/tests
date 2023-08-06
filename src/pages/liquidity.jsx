import {
  Button,
  Center,
  VStack,
  Box,
  Flex,
  FormControl,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormLabel,
  NumberInputField,
  NumberInput,
  Avatar,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Accordion,
  AccordionIcon,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  InputGroup,
  InputRightElement,
  useToast,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";

import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPairContractWithSigner, loadBalance } from "src/utils/helper";
import LiquidityItem from "src/components/pools/LiquidityItem";
import { currencyFormat, formatInputAmount } from "src/utils/stringUtil";
import { createFtContractWithSigner } from "src/utils/helper";
import { config, noneAddress } from "src/state/chain/config";
import loadTokens from "src/state/dex/thunks/loadTokens";
import loadPools from "src/state/dex/thunks/loadPools";
import { emptyToken } from "src/utils/utils";
import TokenModal from "src/components/pools/TokensModal";
export default function Pools() {
  const dispatch = useDispatch();

  const { tokens, pools, dex } = useSelector((state) => state.dex);
  const { account, selectedChain } = useSelector((state) => state.chain);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [token1Name, setToken1Name] = useState(emptyToken);
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Name, setToken2Name] = useState(emptyToken);
  const [token2Amount, setToken2Amount] = useState("0");
  const [token1Balance, setToken1Balance] = useState(BigNumber.from(0));
  const [token2Balance, setToken2Balance] = useState(BigNumber.from(0));
  const [poolInfo, setPoolInfo] = useState({});
  const [myLpTokens, setMyLpTokens] = useState([]);

  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState("Add Liquidity");

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index) => {
    setTabIndex(index);

    // Reload tokens and pools when the tab changes
    dispatch(loadTokens());
    dispatch(loadPools());
  };

  const {
    isOpen: openTokenIn,
    onToggle: toggleTokenIn,
    onClose: closeTokenIn,
  } = useDisclosure();
  const {
    isOpen: openTokenOut,
    onToggle: toggleTokenOut,
    onClose: closeTokenOut,
  } = useDisclosure();

  const handleToken1AmountChange = async (amount) => {
    // Set the token amount
    setToken1Amount(formatInputAmount(amount));

    if (!token1Name.address || !token2Name.address || !poolInfo || poolInfo.reserve1 == "0")
      return;
    const token2Amount = calculateTokenAmount(
      poolInfo.token1 === token1Name.address ? poolInfo.reserve1 : poolInfo.reserve2,
      poolInfo.token2 === token2Name.address ? poolInfo.reserve2 : poolInfo.reserve1,
      amount,
      token1Name.decimals
    );
    setToken2Amount(token2Amount);
  };

  const handleToken2AmountChange = async (amount) => {
    setToken2Amount(formatInputAmount(amount));

    if (!token1Name.address || !token2Name.address || !poolInfo || poolInfo.reserve2 == "0")
      return;

    const token1Amount = calculateTokenAmount(
      poolInfo.token2 === token2Name.address ? poolInfo.reserve2 : poolInfo.reserve1,
      poolInfo.token1 === token1Name.address ? poolInfo.reserve1 : poolInfo.reserve2,
      amount,
      token2Name.decimals
    );
    setToken1Amount(token1Amount);
  };

  useEffect(() => {
    if (
      (token1Name.address &&
        token1Amount &&
        token1Balance.lt(
          ethers.utils.parseUnits(
            token1Amount,
            token1Name.decimals
          )
        )) ||
      (token2Name.address &&
        token2Amount &&
        token2Balance.lt(
          ethers.utils.parseUnits(
            token2Amount,
            token2Name.decimals
          )
        ))
    ) {
      handleBalanceInsufficient();
    } else {
      handlePoolAvailable();
    }
  }, [
    poolInfo,
    token1Amount,
    token1Balance,
    token1Name,
    token2Amount,
    token2Balance,
    token2Name,
  ]);

  const handleToken1NameChange = async (tokenName) => {
    setToken1Name(tokenName);

    if (tokenName.address == token2Name.address) {
      let oldToken1Addr = token1Name.address
      setToken2Name(token1Name);
      setToken2Amount(token1Amount);
      setToken1Amount(token2Amount);
      handleLoadBalance(oldToken1Addr).then((balance) => setToken2Balance(balance));
    } else if (tokenName.address && token2Name.address) {
      let poolInfo = null;
      if (tokenName.address == noneAddress && pools.matrix[config[selectedChain].wrapAddress] && pools.matrix[config[selectedChain].wrapAddress][token2Name.address]) {
        poolInfo = pools.matrix[config[selectedChain].wrapAddress][token2Name.address][0];
      } else if (pools.matrix[tokenName.address] && pools.matrix[tokenName.address][token2Name.address]) {
        poolInfo = pools.matrix[tokenName.address][token2Name.address][0];
      }
      setPoolInfo(poolInfo);
      if (poolInfo && token2Amount) {
        const reserve1 =
          poolInfo.token1 == tokenName.address ? poolInfo.reserve1 : poolInfo.reserve2;
        const reserve2 =
          poolInfo.token1 == tokenName.address ? poolInfo.reserve2 : poolInfo.reserve1;

        const token1Amount = calculateTokenAmount(
          reserve1,
          reserve2,
          token2Amount,
          tokenName.decimals
        );
        setToken1Amount(token1Amount);
      } else {
        setToken1Amount("0");
      }
    }
    closeTokenIn();

    handleLoadBalance(tokenName.address).then((balance) => setToken1Balance(balance));
  };

  const handleToken2NameChange = async (tokenName) => {
    setToken2Name(tokenName);

    if (tokenName.address == token1Name.address) {
      let oldToken2Addr = token2Name.address
      setToken1Name(token2Name);
      setToken2Amount(token1Amount);
      setToken1Amount(token2Amount);
      handleLoadBalance(oldToken2Addr).then((balance) => setToken1Balance(balance));

    } else if (token1Name.address && tokenName.address) {
      let poolInfo = null;
      if (tokenName.address == noneAddress && pools.matrix[token1Name.address] && pools.matrix[token1Name.address][config[selectedChain].wrapAddress]) {
        poolInfo = pools.matrix[token1Name.address][config[selectedChain].wrapAddress][0];
      } if (pools.matrix[token1Name.address] && pools.matrix[token1Name.address][tokenName.address]) {
        poolInfo = pools.matrix[token1Name.address][tokenName.address][0];
      }

      setPoolInfo(poolInfo);

      if (poolInfo && token1Amount) {
        const reserve1 =
          poolInfo.token2 == tokenName.address ? poolInfo.reserve1 : poolInfo.reserve2;
        const reserve2 =
          poolInfo.token2 == tokenName.address ? poolInfo.reserve2 : poolInfo.reserve1;
        const token2Amount = calculateTokenAmount(
          reserve1,
          reserve2,
          token1Amount,
          tokenName.decimals
        );
        setToken2Amount(token2Amount);
      } else {
        setToken2Amount("0");
      }
    }
    closeTokenOut();
    handleLoadBalance(tokenName.address).then((balance) => setToken2Balance(balance));
  };

  const handlePoolAvailable = () => {
    setBtnDisable(false);
    setBtnText("Add Liquidity");
  };

  const handleBalanceInsufficient = () => {
    setBtnDisable(true);
    setBtnText("Insufficient balance");
  };

  const handleLoadBalance = useCallback(
    async (tokenName) => {
      let result = BigNumber.from(0);
      if (tokenName) {
        setLoading(true);
        if (account && selectedChain) {
          result = await loadBalance(account, selectedChain, tokenName);
        }
        setLoading(false);
      }
      return result;
    },
    [account, selectedChain]
  );

  const handleAddLiquidity = async (e) => {
    e.preventDefault();
    const currentTimeUnix = Math.floor(Date.now() / 1000);
    // Calculate the Unix time for the next 30 minutes
    const next30MinutesUnix = currentTimeUnix + 30 * 60;
    const deadline = BigNumber.from(next30MinutesUnix);
    setLoading(true);
    try {
      if ( token1Name.address == noneAddress || token2Name.address == noneAddress) {
        let tokenAddr =
          token1Name.address == noneAddress
            ? token2Name.address
            : token1Name.address;
        let amountIn =
          token1Name.address == noneAddress
            ? token2Amount
            : token1Amount;
        let amountETH =
          token1Name.address == noneAddress
            ? token1Amount
            : token2Amount;

        let erc20 = createFtContractWithSigner(tokenAddr);
        let aDesired = ethers.utils.parseUnits(
          amountIn,
          tokens.obj[tokenAddr]?.decimals
        );
        let currentApproval = await erc20.allowance(
          account,
          config[selectedChain].dexAddress
        );
        if (currentApproval.lt(aDesired)) {
          let approveTx = await erc20.approve(
            config[selectedChain].dexAddress,
            ethers.constants.MaxUint256
          );
          await approveTx.wait();
        }

        let addLiquidTx = await dex.signer.addLiquidityETH(
          tokenAddr,
          aDesired,
          BigNumber.from(0),
          BigNumber.from(0),
          account,
          deadline,
          { value: ethers.utils.parseEther(amountETH) }
        );
        await addLiquidTx.wait();
      } else {
        let erc20In = createFtContractWithSigner(token1Name.address);
        let erc20Out = createFtContractWithSigner(token2Name.address);
        let approvePromises = [];

        let aDesired = ethers.utils.parseUnits(
          token1Amount,
          token1Name.decimals
        );
        let bDesired = ethers.utils.parseUnits(
          token2Amount,
          token2Name.decimals
        );
        let currentApproval1 = await erc20In.allowance(
          account,
          config[selectedChain].dexAddress
        );
        let currentApproval2 = await erc20In.allowance(
          account,
          config[selectedChain].dexAddress
        );

        if (currentApproval1.lt(aDesired)) {
          approvePromises.push(
            erc20In.approve(
              config[selectedChain].dexAddress,
              ethers.constants.MaxUint256
            )
          );
        }
        if (currentApproval2.lt(bDesired)) {
          approvePromises.push(
            erc20Out.approve(
              config[selectedChain].dexAddress,
              ethers.constants.MaxUint256
            )
          );
        }
        let approveRes = await Promise.all(approvePromises);
        approvePromises = [];
        approveRes.forEach((item) => approvePromises.push(item.wait()));
        if (approvePromises.length) {
          await Promise.all(approvePromises);
        }

        let addLiquidTx = await dex.signer.addLiquidity(
          token1Name.address,
          token2Name.address,
          aDesired,
          bDesired,
          BigNumber.from(0),
          BigNumber.from(0),
          account,
          deadline
        );
        await addLiquidTx.wait();
      }
      toast({
        status: "success",
        duration: 5000,
        title: "Add liquidity success",
        isClosable: true,
      });
      dispatch(loadPools())
      handleLoadBalance(token1Name.address).then((balance) => setToken1Balance(balance));
      handleLoadBalance(token2Name.address).then((balance) => setToken2Balance(balance));

      setToken1Amount("0");
      setToken2Amount("0");
    } catch (e) {
      toast({
        status: "error",
        duration: 5000,
        title: "Transaction failed",
        isClosable: true,
      });
      console.log(e);
    }

    setLoading(false);
  };

  const handleRemoveLiquidity = async (removeAmount, pool) => {
    const currentTimeUnix = Math.floor(Date.now() / 1000);
    // Calculate the Unix time for the next 30 minutes
    const next30MinutesUnix = currentTimeUnix + 30 * 60;
    const deadline = BigNumber.from(next30MinutesUnix);
    setLoading(true);

    try {
      const pairContract = createPairContractWithSigner(pool.pair);
      let liquidity = ethers.utils.parseEther(removeAmount);
      let currentApproval = await pairContract.allowance(
        account,
        config[selectedChain].dexAddress
      );
      if (currentApproval.lt(liquidity)) {
        let tx = await pairContract.approve(
          config[selectedChain].dexAddress,
          ethers.constants.MaxUint256
        );
        await tx.wait();
      }

      if (account != account) {
        toast({
          status: "error",
          title: "Current account is not signer",
          duration: 3000,
          isClosable: true,
        });
      } else if (
        pool.token0.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase() ||
        pool.token1.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase()
      ) {
        let tokenAddr =
          pool.token0.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase()
            ? pool.token1
            : pool.token0;

        let rmLiquidTx = await dex.signer.removeLiquidityETH(
          tokenAddr,
          liquidity,
          BigNumber.from(0),
          BigNumber.from(0),
          account,
          deadline
        );
        await rmLiquidTx.wait();
      } else {
        let rmLiquidTx = await dex.signer.removeLiquidity(
          pool.token0,
          pool.token1,
          liquidity,
          BigNumber.from(0),
          BigNumber.from(0),
          account,
          deadline
        );
        await rmLiquidTx.wait();
      }
      toast({
        status: "success",
        duration: 5000,
        title: "Remove liquidity success",
        isClosable: true,
      });
      await dispatch(loadPools())
      getMyLpTokens();
      handleToken1NameChange(token1Name);
    } catch (e) {
      toast({
        status: "error",
        duration: 5000,
        title: "Transaction failed",
        isClosable: true,
      });
      console.log("error", e.message);
    }
    setLoading(false);
  };

  const calculateTokenAmount = (
    reserve1,
    reserve2,
    token1Amount,
    decimals
  ) => {
    // const reserve1BN = new BN(reserve1);
    if (reserve1.eq(BigNumber.from(0))) {
      return "0";
    }

    if (!token1Amount) {
      return "0";
    }

    // const reserve2BN = new BN(reserve2);
    const amount1BN = ethers.utils.parseUnits(
      token1Amount,
      decimals
    );

    return ethers.utils.formatUnits(
      amount1BN.mul(reserve2).div(reserve1).toString(),
      decimals
    );
  };

  const handleSetMaxToken1 = () => {
    const tokenAmount = ethers.utils.formatUnits(
      token1Balance,
      token1Name.decimals
    );
    setToken1Amount(tokenAmount);

    if (poolInfo && token2Name.address) {
      const reserve1 =
        poolInfo.token1 === token1Name.address ? poolInfo.reserve1 : poolInfo.reserve2;

      const reserve2 =
        poolInfo.token1 === token1Name.address ? poolInfo.reserve2 : poolInfo.reserve1;

      const token2Amount = calculateTokenAmount(
        reserve1,
        reserve2,
        tokenAmount,
        token2Name.decimals
      );
      setToken2Amount(token2Amount);
    }
  };

  const handleSetMaxToken2 = () => {
    const tokenAmount = ethers.utils.formatUnits(
      token2Balance,
      token2Name.decimals
    );
    setToken2Amount(tokenAmount);

    if (poolInfo && token1Name.address) {
      const reserve1 =
        poolInfo.token1 === token1Name.address ? poolInfo.reserve1 : poolInfo.reserve2;

      const reserve2 =
        poolInfo.token1 === token1Name.address ? poolInfo.reserve2 : poolInfo.reserve1;

      const token1Amount = calculateTokenAmount(
        reserve2,
        reserve1,
        tokenAmount,
        token1Name.decimals
      );
      setToken1Amount(token1Amount);
    }
  };
  const getMyLpTokens = async () => {
    const lpTokens = [];
    //rewrite this
    if (pools.loaded && pools.list.length && selectedChain) {
      await Promise.all(
        pools.list.map(async (item) => {
          const balance = await loadBalance(account, selectedChain, item.pair);
          if (!balance.isZero()) {
            lpTokens.push({
              ...item,
              balance: balance.toString(),
            });
          }
        })
      );
    }
    setMyLpTokens(lpTokens);
  };

  useEffect(() => {
    getMyLpTokens();
  }, [account, pools]);

  if (!tokens.loaded || !pools.loaded) {
    return (
      <Box
        my="6"
        w="full"
        boxShadow="lg"
        bg="white"
        p={20}
        h={{ base: "calc(100vh - 50px)" }}
      >
        <Box>
          <SkeletonCircle size="20" />
          <SkeletonText mt="4" noOfLines={12} spacing="4" />
        </Box>
      </Box>
    );
  }
  return (
    <Center
      bg="linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 90%)"
      pt={8}
    >
      <Center
        w={{ base: "99%", md: "auto" }}
        borderRadius={"md"}
        bgColor="white"
        px={{ base: 0, md: 4 }}
        py={6}
      >
        <Tabs
          variant="soft-rounded"
          defaultIndex={account ? 0 : 1}
          onChange={handleTabsChange}
        >
          <Box
            w={{ base: "full", md: "550px" }}
            mx="auto"
            minH={600}
            h={{ base: "auto", md: "calc(100vh - 237px)" }}
            overflowY={"auto"}
          >
            <TabList w="full">
              <Tab isDisabled={!account}>My Liquidity</Tab>
              <Tab>+ Add Liquidity</Tab>
            </TabList>
            <Box h={"2px"} mt={4} bg="black" />
            <TabPanels w="full">
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Accordion allowMultiple>
                      {myLpTokens.map((lpToken) => (
                        <LiquidityItem
                          key={lpToken.pair}
                          lpToken={lpToken}
                          pool={pools.obj[lpToken.pair]}
                          handleRemoveLiquidity={handleRemoveLiquidity}
                          loading={loading}
                        />
                      ))}
                    </Accordion>
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormControl w="full">
                  <FormControl id="token1">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormLabel>First Token</FormLabel>
                      {token1Balance && (
                        <div>
                          Balance:{" "}
                          {currencyFormat(
                            ethers.utils.formatUnits(
                              token1Balance,
                              token1Name.decimals
                            )
                          )}
                        </div>
                      )}
                    </Box>
                    <Flex gap={6}>
                      <InputGroup>
                        <NumberInput
                          value={token1Amount}
                          w="full"
                          size="lg"
                          onChange={handleToken1AmountChange}
                        >
                          <NumberInputField />
                        </NumberInput>
                        <InputRightElement width="4.5rem" m="0.25rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleSetMaxToken1}
                          >
                            Max
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <Button
                        colorScheme="telegram"
                        justifyContent="left"
                        minW="200px"
                        size="lg"
                        variant="outline"
                        aria-label="Options token 1"
                        onClick={toggleTokenIn}
                        leftIcon={
                          <Avatar
                            size="sm"
                            name={
                              token1Name.symbol
                                ? token1Name.symbol
                                : "In"
                            }
                            src={
                              token1Name.icon
                                ? token1Name.icon
                                : "/base-logo-in-blue.png"
                            }
                          />
                        }
                      >
                        <Text>
                          {token1Name.symbol
                            ? token1Name.symbol
                            : "Select token"}
                        </Text>
                      </Button>
                      <TokenModal isOpen={openTokenIn} onClose={closeTokenIn} handleChoseToken={handleToken1NameChange} selectedAddr={token1Name.address} />
                    </Flex>
                  </FormControl>

                  <FormControl id="token2" mt={4}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormLabel>Second Token</FormLabel>
                      {token2Balance && (
                        <div>
                          Balance:{" "}
                          {currencyFormat(
                            ethers.utils.formatUnits(
                              token2Balance,
                              token2Name.decimals
                            )
                          )}
                        </div>
                      )}
                    </Box>
                    <Flex gap={6}>
                      <InputGroup>
                        <NumberInput
                          value={token2Amount}
                          w="full"
                          size="lg"
                          onChange={handleToken2AmountChange}
                        >
                          <NumberInputField />
                        </NumberInput>
                        <InputRightElement width="4.5rem" m="0.25rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleSetMaxToken2}
                          >
                            Max
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <Button
                        colorScheme="telegram"
                        justifyContent="left"
                        minW="200px"
                        size="lg"
                        variant="outline"
                        aria-label="Options token out"
                        onClick={toggleTokenOut}
                        leftIcon={
                          <Avatar
                            size="sm"
                            name={
                              token2Name.symbol
                                ? token2Name.symbol
                                : "Out"
                            }
                            src={
                              token2Name.icon
                                ? token2Name.icon
                                : "/base-logo-in-blue.png"
                            }
                          />
                        }
                      >
                        <Text>
                          {token2Name.symbol
                            ? token2Name.symbol
                            : "Select token"}
                        </Text>
                      </Button>
                      <TokenModal isOpen={openTokenOut} onClose={closeTokenOut} handleChoseToken={handleToken2NameChange} selectedAddr={token2Name.address} />
                    </Flex>
                  </FormControl>

                  <Button
                    mt={4}
                    colorScheme="facebook"
                    type="submit"
                    isLoading={loading}
                    isDisabled={btnDisable}
                    onClick={handleAddLiquidity}
                  >
                    {btnText}
                  </Button>
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
      </Center>
    </Center>
  );
}

const PoolDetail = ({ label, value }) => (
  <Flex mb={2}>
    <Box width="60%" fontWeight="bold">
      {label}
    </Box>
    <Box width="40%" textAlign="right">
      100
    </Box>
  </Flex>
);

const Pool = ({ pool }) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          {pool.token1} - {pool.token2}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <PoolDetail
        label="Your total liquidity tokens:"
        value={pool.totalPoolTokens}
      />
      <PoolDetail label="Total Token 1:" value={pool.totalToken1} />
      <PoolDetail label="Total Token 2:" value={pool.totalToken2} />
    </AccordionPanel>
  </AccordionItem>
);
