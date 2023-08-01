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
  Divider,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";

import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBalance } from "src/utils/helper";
import LiquidityItem from "src/components/pools/LiquidityItem";
import { currencyFormat } from "src/utils/stringUtil";
import { createFtContractWithSigner } from "src/utils/helper";
import { config } from "src/state/chain/config";
export default function Pools() {
  const { tokens, pools, dex } = useSelector((state) => state.dex);
  const { account, selectedChain } = useSelector((state) => state.chain);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [token1Name, setToken1Name] = useState("");
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Name, setToken2Name] = useState("");
  const [token2Amount, setToken2Amount] = useState("0");
  const [token1Balance, setToken1Balance] = useState(BigNumber.from(0));
  const [token2Balance, setToken2Balance] = useState(BigNumber.from(0));
  const [poolInfo, setPoolInfo] = useState({});
  const [myLpTokens, setMyLpTokens] = useState([]);

  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState("Add Liquidity");

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
    setToken1Amount(amount);

    if (!token1Name || !token2Name || !poolInfo || poolInfo.reserve1 == "0")
      return;

    const token2Amount = calculateTokenAmount(
      poolInfo.token1 === token1Name ? poolInfo.reserve1 : poolInfo.reserve2,
      poolInfo.token2 === token2Name ? poolInfo.reserve2 : poolInfo.reserve1,
      amount,
      token1Name
    );
    setToken2Amount(token2Amount);
  };

  const handleToken2AmountChange = async (amount) => {
    setToken2Amount(amount);

    if (!token1Name || !token2Name || !poolInfo || poolInfo.reserve2 == "0")
      return;

    const token1Amount = calculateTokenAmount(
      poolInfo.token2 === token2Name ? poolInfo.reserve2 : poolInfo.reserve1,
      poolInfo.token1 === token1Name ? poolInfo.reserve1 : poolInfo.reserve2,
      amount,
      token2Name
    );
    setToken1Amount(token1Amount);
  };

  useEffect(() => {
    if (token1Name && token2Name && !poolInfo) {
      handleNoPoolFound();
      return;
    }
    if (
      (token1Name &&
        token1Amount &&
        token1Balance.lt(
          ethers.utils.parseUnits(
            token1Amount,
            tokens.obj[token1Name]?.decimals
          )
        )) ||
      (token2Name &&
        token2Amount &&
        token2Balance.lt(
          ethers.utils.parseUnits(
            token2Amount,
            tokens.obj[token2Name]?.decimals
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

    if (tokenName == token2Name) {
      setToken2Name(token1Name);
      setToken2Amount(token1Amount);
      setToken1Amount(token2Amount);
    } else if (tokenName && token2Name) {
      let poolInfo = null;
      if (pools.matrix[tokenName] && pools.matrix[tokenName][token2Name]) {
        poolInfo = pools.matrix[tokenName][token2Name][0];
      }
      setPoolInfo(poolInfo);
      if (poolInfo && token2Amount) {
        const reserve1 =
          poolInfo.token1 == tokenName ? poolInfo.reserve1 : poolInfo.reserve2;
        const reserve2 =
          poolInfo.token1 == tokenName ? poolInfo.reserve2 : poolInfo.reserve1;

        const token1Amount = calculateTokenAmount(
          reserve1,
          reserve2,
          token2Amount,
          tokenName
        );
        setToken1Amount(token1Amount);
      } else {
        setToken1Amount("0");
      }
    }
    closeTokenIn();

    handleLoadBalance(tokenName).then((balance) => setToken1Balance(balance));
  };

  const handleToken2NameChange = async (tokenName) => {
    setToken2Name(tokenName);

    if (tokenName == token1Name) {
      setToken1Name(token2Name);
      setToken2Amount(token1Amount);
      setToken1Amount(token2Amount);
    } else if (token1Name && tokenName) {
      let poolInfo = null;
      if (pools.matrix[token1Name] && pools.matrix[token1Name][tokenName]) {
        poolInfo = pools.matrix[token1Name][tokenName][0];
      }

      setPoolInfo(poolInfo);

      if (poolInfo && token1Amount) {
        const reserve1 =
          poolInfo.token2 == tokenName ? poolInfo.reserve1 : poolInfo.reserve2;
        const reserve2 =
          poolInfo.token2 == tokenName ? poolInfo.reserve2 : poolInfo.reserve1;
        const token2Amount = calculateTokenAmount(
          reserve1,
          reserve2,
          token1Amount,
          tokenName
        );
        setToken2Amount(token2Amount);
      } else {
        setToken2Amount("0");
      }
    }
    closeTokenOut();
    handleLoadBalance(tokenName).then((balance) => setToken2Balance(balance));
  };

  const handleNoPoolFound = () => {
    setBtnDisable(true);
    setBtnText("No Pool Found!");
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
      if (
        token1Name.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase() ||
        token2Name.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase()
      ) {
        let tokenAddr =
          token1Name.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase()
            ? token2Name
            : token1Name;
        let amountIn =
          token1Name.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase()
            ? token2Amount
            : token1Amount;
        let amountETH =
          token1Name.toLocaleLowerCase() ==
          config[selectedChain].wrapAddress.toLocaleLowerCase()
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
        let erc20In = createFtContractWithSigner(token1Name);
        let erc20Out = createFtContractWithSigner(token2Name);
        let approvePromises = [];

        let aDesired = ethers.utils.parseUnits(
          token1Amount,
          tokens.obj[token1Name]?.decimals
        );
        let bDesired = ethers.utils.parseUnits(
          token2Amount,
          tokens.obj[token2Name]?.decimals
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
          token1Name,
          token2Name,
          aDesired,
          bDesired,
          BigNumber.from(0),
          BigNumber.from(0),
          account,
          deadline
        );
        await addLiquidTx.wait();
      }
    } catch (e) {
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
    console.log("pool", pool, config[selectedChain].wrapAddress);
    try {
      if (
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

        let liquidity = ethers.utils.parseUnits(
          removeAmount,
          tokens.obj[pool.pair]?.decimals
        );
        console.log("body 123", {
          pool,
          tokenAddr,
          liquidity: liquidity.toString(),
        });
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
        let lpAddress = pool.pair;

        let liquidity = ethers.utils.parseUnits(
          removeAmount,
          tokens.obj[lpAddress]?.decimals
        );

        console.log(
          "body",
          pool.token0,
          pool.token1,
          liquidity.toString(),
          BigNumber.from(0),
          BigNumber.from(0),
          account,
          deadline
        );

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
    } catch (e) {
      console.log("error", e.message);
    }
    setLoading(false);
  };

  const calculateTokenAmount = (
    reserve1,
    reserve2,
    token1Amount,
    tokenName
  ) => {
    // const reserve1BN = new BN(reserve1);
    if (reserve1.eq(BigNumber.from(0))) {
      return "0";
    }

    if (!token1Amount) {
      return "";
    }

    // const reserve2BN = new BN(reserve2);
    const amount1BN = ethers.utils.parseUnits(
      token1Amount,
      tokens.obj[tokenName]?.decimals
    );

    return ethers.utils.formatUnits(
      amount1BN.mul(reserve2).div(reserve1).toString(),
      tokens.obj[tokenName]?.decimals
    );
  };

  const handleSetMaxToken1 = () => {
    const tokenAmount = ethers.utils.formatUnits(
      token1Balance,
      tokens.obj[token1Name]?.decimals
    );
    setToken1Amount(tokenAmount);

    if (poolInfo && token2Name) {
      const reserve1 =
        poolInfo.token1 === token1Name ? poolInfo.reserve1 : poolInfo.reserve2;

      const reserve2 =
        poolInfo.token1 === token1Name ? poolInfo.reserve2 : poolInfo.reserve1;

      const token2Amount = calculateTokenAmount(
        reserve1,
        reserve2,
        tokenAmount,
        token2Name
      );
      setToken2Amount(token2Amount);
    }
  };

  const handleSetMaxToken2 = () => {
    const tokenAmount = ethers.utils.formatUnits(
      token2Balance,
      tokens.obj[token2Name]?.decimals
    );
    setToken2Amount(tokenAmount);

    if (poolInfo && token1Name) {
      const reserve1 =
        poolInfo.token1 === token1Name ? poolInfo.reserve1 : poolInfo.reserve2;

      const reserve2 =
        poolInfo.token1 === token1Name ? poolInfo.reserve2 : poolInfo.reserve1;

      const token1Amount = calculateTokenAmount(
        reserve2,
        reserve1,
        tokenAmount,
        token1Name
      );
      setToken1Amount(token1Amount);
    }
  };

  useEffect(() => {
    const getMyLpTokens = async () => {
      const lpTokens = [];
      //rewrite this
      await Promise.all(
        pools.list.map(async (item) => {
          const balance = await loadBalance(account, selectedChain, item.pair);
          if (balance.gt(BigNumber.from(0))) {
            lpTokens.push({
              ...item,
              balance: balance.toString(),
            });
          }
        })
      );

      setMyLpTokens(lpTokens);
    };

    getMyLpTokens();
  }, [account, pools.list]);
  useEffect(() => {
    if (confirm) {
      handleLoadBalance(token1Name).then((res) => setToken1Balance(res));
      handleLoadBalance(token2Name).then((res) => setToken2Balance(res));
    }
  }, [confirm]);

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
        <Tabs variant="soft-rounded">
          <Box
            w={{ base: "full", md: "550px" }}
            mx="auto"
            minH={600}
            h={{ base: "auto", md: "calc(100vh - 237px)" }}
            overflowY={"auto"}
          >
            <TabList w="full">
              <Tab>My Liquidity</Tab>
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
                              tokens.obj[token1Name]?.decimals
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
                      <Popover
                        matchWidth
                        isOpen={openTokenIn}
                        onClose={closeTokenIn}
                      >
                        <PopoverTrigger>
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
                                  token1Name
                                    ? tokens.obj[token1Name]?.symbol
                                    : "In"
                                }
                                src={
                                  token1Name
                                    ? tokens.obj[token1Name]?.icon
                                    : "/base-logo-in-blue.png"
                                }
                              />
                            }
                          >
                            <Text>
                              {token1Name
                                ? tokens.obj[token1Name]?.symbol
                                : "Select token"}
                            </Text>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          w="full"
                          maxH="200px"
                          overflowY="scroll"
                        >
                          <PopoverBody w="full">
                            <VStack w="full">
                              {tokens.list
                                .filter((fItem) => fItem.address !== token1Name)
                                .map((item, index) => (
                                  <Button
                                    w="full"
                                    justifyContent="left"
                                    key={`token-option-in-${index}`}
                                    leftIcon={
                                      <Avatar
                                        size="xs"
                                        name={item.symbol}
                                        src={tokens.obj[item.address]?.icon}
                                      />
                                    }
                                    onClick={() => {
                                      handleToken1NameChange(item.address);
                                    }}
                                  >
                                    <Text>
                                      {tokens.obj[item.address]?.symbol}
                                    </Text>
                                  </Button>
                                ))}
                            </VStack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
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
                              tokens.obj[token2Name]?.decimals
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
                      <Popover
                        matchWidth
                        isOpen={openTokenOut}
                        onClose={closeTokenOut}
                      >
                        <PopoverTrigger h="full">
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
                                  token2Name
                                    ? tokens.obj[token2Name]?.symbol
                                    : "Out"
                                }
                                src={
                                  token2Name
                                    ? tokens.obj[token2Name]?.icon
                                    : "/base-logo-in-blue.png"
                                }
                              />
                            }
                          >
                            <Text>
                              {token2Name
                                ? tokens.obj[token2Name]?.symbol
                                : "Select token"}
                            </Text>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          w="full"
                          maxH="200px"
                          overflowY="scroll"
                        >
                          <PopoverBody w="full">
                            <VStack w="full">
                              {tokens.list
                                .filter((fItem) => fItem.address !== token2Name)
                                .map((item, index) => (
                                  <Button
                                    w="full"
                                    justifyContent="left"
                                    key={`token-option-out-${index}`}
                                    leftIcon={
                                      <Avatar
                                        size="xs"
                                        name={item.address}
                                        src={tokens.obj[item.address]?.icon}
                                      />
                                    }
                                    onClick={() => {
                                      handleToken2NameChange(item.address);
                                    }}
                                  >
                                    <Text>
                                      {tokens.obj[item.address]?.symbol}
                                    </Text>
                                  </Button>
                                ))}
                            </VStack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
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
