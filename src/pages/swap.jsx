import {
  Box,
  Center,
  FormControl,
  FormLabel,
  NumberInputField,
  NumberInput,
  Button,
  Flex,
  Avatar,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import {
  getSteps,
  loadBalance,
  createFtContractWithSigner,
} from "src/utils/helper";

// import { metadatas } from "src/utils/utils";
import { currencyFormat, formatInputAmount } from "src/utils/stringUtil";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { config, noneAddress } from "src/state/chain/config";
import SwapTokenModal from "src/components/swap/TokensModal";
import { emptyToken } from "src/utils/utils";

export default function SwapPage() {
  const [tokenIn, setTokenIn] = useState(emptyToken);
  const [bIn, setBIn] = useState(BigNumber.from(0));
  const [bOut, setBOut] = useState(BigNumber.from(0));
  const [amountIn, setAmountIn] = useState("0");
  const [tokenOut, setTokenOut] = useState(emptyToken);
  const [amountOut, setAmountOut] = useState("0");
  const [swapSteps, setSwapSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { pools, tokens, loaded, dex } = useSelector((state) => state.dex);
  const { account, selectedChain } = useSelector((state) => state.chain);

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
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState("Swap");

  const handleSwapAvailable = () => {
    setBtnDisable(false);
    setBtnText("Swap");
  };

  const handleBalanceInsufficient = () => {
    setBtnDisable(true);
    setBtnText("Insufficient balance");
  };

  const handleGetAmountIn = useCallback(
    async (tIn, tOut, aXOut) => {
      if (tIn.address && tOut.address && aXOut !== "0" && tIn.address != tOut.address) {
        let steps = getSteps(tIn.address, tOut.address, pools.matrix);
        setSwapSteps(steps);
        if (steps.length < 2) {
          setBtnDisable(true);
          setBtnText("Not existed route");
          setAmountIn("0");
        } else if (isNaN(aXOut)) {
          setBtnDisable(true);
          setBtnText("Amount out is not valid");
          setAmountIn("0");
        } else {
          try {
            let aIns = await dex.contract.getAmountsIn(
              ethers.utils.parseUnits(aXOut, tOut.decimals),
              steps
            );
            setAmountIn(
              ethers.utils.formatUnits(aIns[0], tIn.decimals)
            );
            if (bIn.lt(aIns[0])) {
              handleBalanceInsufficient();
            } else {
              handleSwapAvailable();
            }
          } catch (e) {
            setBtnDisable(true);
            setBtnText("Not existed route");
            setAmountIn("0");
            console.log(e);
          }
        }
      } else if (tIn.address && tOut.address && tIn.address != tOut.address) {
        let steps = getSteps(tIn.address, tOut.address, pools.matrix);
        setSwapSteps(steps);
      }
    },
    [tokens, dex, pools, bIn]
  );

  const handleGetAmountOut = useCallback(
    async (tIn, tOut, aXIn) => {
      if (tIn.address && tOut.address && aXIn !== "0" && tIn.address != tOut.address) {
        let steps = getSteps(tIn.address, tOut.address, pools.matrix);
        setSwapSteps(steps);
        if (steps.length < 2) {
          setBtnDisable(true);
          setAmountOut("0");
          setBtnText("Not existed route");
        } else if (isNaN(aXIn)) {
          setBtnDisable(true);
          setAmountOut("0");
          setBtnText("Amount in is not valid");
        } else {
          try {
            let aOuts = await dex.contract.getAmountsOut(
              ethers.utils.parseUnits(aXIn, tIn.decimals),
              steps
            );
            setAmountOut(
              ethers.utils.formatUnits(
                aOuts[aOuts.length - 1],
                tokens.obj[tOut]?.decimals
              )
            );
            if (
              bIn.lt(ethers.utils.parseUnits(aXIn, tIn.decimals))
            ) {
              handleBalanceInsufficient();
            } else {
              handleSwapAvailable();
            }
          } catch (e) {
            setBtnDisable(true);
            setBtnText("Not existed route");
            setAmountOut("0");
            console.log(e);
          }
        }
      } else if (tIn.address && tOut.address && tIn.address != tOut.address) {
        let steps = getSteps(tIn.address, tOut.address, pools.matrix);
        setSwapSteps(steps);
      }
    },
    [tokens, dex, pools, bIn]
  );

  const handleLoadBalance = useCallback(
    async (token) => {
      setIsLoading(true);
      let result = BigNumber.from(0);
      if (account && selectedChain) {
        result = await loadBalance(account, selectedChain, token);
      }
      setIsLoading(false);
      return result;
    },
    [account, selectedChain]
  );


  const handleSwap = async (e) => {
    setIsLoading(true);
    try {
      let minAmountOut = BigNumber.from(99)
        .mul(ethers.utils.parseEther(amountOut))
        .div(BigNumber.from(100));

      const currentTimeUnix = Math.floor(Date.now() / 1000);
      // Calculate the Unix time for the next 30 minutes
      const next30MinutesUnix = currentTimeUnix + 30 * 60;
      const deadline = BigNumber.from(next30MinutesUnix);

      if (
        tokenIn.address == noneAddress
      ) {
        let swapTx = await dex.signer.swapExactETHForTokens(
          minAmountOut,
          swapSteps,
          account,
          deadline,
          {
            value: ethers.utils.parseEther(amountIn),
          }
        );
        await swapTx.wait();
      } else if (tokenOut.address == noneAddress) {
        let erc20 = createFtContractWithSigner(tokenIn.address);
        let aIn = ethers.utils.parseUnits(
          amountIn,
          tokenIn.decimals
        );
        let currentApproval = await erc20.allowance(
          account,
          config[selectedChain].dexAddress
        );
        if (currentApproval.lt(aIn)) {
          let approveTx = await erc20.approve(
            config[selectedChain].dexAddress,
            ethers.constants.MaxUint256
          );
          await approveTx.wait();
        }

        let swapTx = await dex.signer.swapExactTokensForETH(
          aIn,
          minAmountOut,
          swapSteps,
          account,
          deadline
        );
        await swapTx.wait();
      } else {
        let erc20 = createFtContractWithSigner(tokenIn.address);
        let aIn = ethers.utils.parseUnits(
          amountIn,
          tokenIn.decimals
        );
        let currentApproval = await erc20.allowance(
          account,
          config[selectedChain].dexAddress
        );
        if (currentApproval.lt(aIn)) {
          let approveTx = await erc20.approve(
            config[selectedChain].dexAddress,
            ethers.constants.MaxUint256
          );
          await approveTx.wait();
        }
        let swapTx = await dex.signer.swapExactTokensForTokens(
          aIn,
          minAmountOut,
          swapSteps,
          account,
          deadline
        );
        await swapTx.wait();
      }
      toast({
        status: "success",
        duration: 5000,
        title: "Swap success",
        isClosable: true,
      });
      handleSelectTokenIn(tokenIn);
      handleSelectTokenOut(tokenOut);
    } catch (e) {
      toast({
        status: "error",
        duration: 5000,
        title: "Transaction failed",
        isClosable: true,
      });
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleSelectTokenIn = useCallback(
    (value) => {
      if (value.address == tokenOut.address) {
        let oldTokenIn = tokenIn;
        if (oldTokenIn.address) {
          setTokenOut(oldTokenIn);
          handleLoadBalance(oldTokenIn.address).then((res) => setBOut(res));
        } else {
          setTokenOut(emptyToken);
          setBOut(BigNumber.from(0));
        }

        handleGetAmountOut(value, oldTokenIn, amountIn);
      } else {
        handleGetAmountOut(value, tokenOut, amountIn);
      }
      setTokenIn(value);
      handleLoadBalance(value.address).then((res) => setBIn(res));
      closeTokenIn();
    },
    [tokenOut, tokenIn, amountIn]
  );

  const handleSelectTokenOut = useCallback(
    (value) => {
      if (value.address == tokenIn.address) {
        let oldTokenOut = tokenOut;
        if (oldTokenOut.address) {
          setTokenIn(oldTokenOut);
          handleLoadBalance(oldTokenOut.address).then((res) => setBIn(res));
        } else {
          setTokenIn(emptyToken);
          setBIn(BigNumber.from(0));
        }

        handleGetAmountOut(oldTokenOut, value, amountIn);
      } else {
        handleGetAmountOut(tokenIn, value, amountIn);
      }
      setTokenOut(value);
      handleLoadBalance(value.address).then((res) => setBOut(res));
      closeTokenOut();
    },
    [tokenIn, tokenOut, amountIn]
  );

  const handleSetAmountIn = useCallback(
    (value) => {
      const amount = formatInputAmount(value);
      setAmountIn(amount);
      handleGetAmountOut(tokenIn, tokenOut, amount);
    },
    [tokenIn, tokenOut]
  );

  const handleSetAmountOut = useCallback(
    (value) => {
      const amount = formatInputAmount(value);
      setAmountOut(amount);
      handleGetAmountIn(tokenIn, tokenOut, amount);
    },
    [tokenIn, tokenOut]
  );

  const handleSetMaxTokenIn = () => {
    setAmountIn(ethers.utils.formatUnits(bIn, tokenIn.decimals));
    handleGetAmountOut(
      tokenIn,
      tokenOut,
      ethers.utils.formatUnits(bIn, tokenIn.decimals)
    );
  };

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
    <Box
      bg="linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 90%)"
      width={"full"}
      minH={{
        base: "auto",
        md: "calc(100vh - 170px)",
      }}
    >
      <Center color="#">
        <Center
          w={{ base: "95%", md: "450px" }}
          h={"650px"}
          mt={"50px"}
          borderRadius={"md"}
          bgColor="white"
          px={4}
          py={6}
          flex
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Text fontSize="2xl">Swap</Text>
          <VStack gap={"72px"} w="full">
            <Box w="full">
              <FormControl w="full">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormLabel>Token In</FormLabel>
                  <div>
                    Balance:{" "}
                    {currencyFormat(
                      ethers.utils.formatUnits(
                        bIn,
                        tokenIn.decimals
                      )
                    )}
                  </div>
                </Box>
                <Flex gap={6} flexDirection={"column"}>
                  <Button
                    borderColor={"#5EEDFF"}
                    colorScheme="telegram"
                    justifyContent="left"
                    minW="200px"
                    size="lg"
                    variant="outline"
                    aria-label="Options token in"
                    onClick={toggleTokenIn}
                    leftIcon={
                      <Avatar
                        size="sm"
                        name={tokenIn.symbol ? tokenIn.symbol : "In"}
                        src={
                          tokenIn.icon
                            ? tokenIn?.icon
                            : "/base-logo-in-blue.png"
                        }
                      />
                    }
                  >
                    {tokenIn.symbol
                      ? tokenIn.symbol
                      : "Select token"}
                  </Button>
                  <SwapTokenModal isOpen={openTokenIn} onClose={closeTokenIn} handleChoseToken={handleSelectTokenIn} selectedAddr={tokenIn.address} />
                  <InputGroup>
                    <NumberInput
                      borderColor={"#5EEDFF"}
                      value={amountIn}
                      w="full"
                      size="lg"
                      onChange={(value) => handleSetAmountIn(value)}
                    >
                      <NumberInputField />
                    </NumberInput>
                    <InputRightElement width="4.5rem" m="0.25rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleSetMaxTokenIn}
                      >
                        Max
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>
            </Box>
            <Box w="full">
              <FormControl w="full">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormLabel>Token Out</FormLabel>
                  <div>
                    Balance:{" "}
                    {currencyFormat(
                      ethers.utils.formatUnits(
                        bOut,
                        tokenOut.decimals
                      )
                    )}
                  </div>
                </Box>
                <Flex gap={6} flexDirection={"column"}>
                  <Button
                    colorScheme="telegram"
                    justifyContent="left"
                    minW="200px"
                    size="lg"
                    variant="outline"
                    aria-label="Options token out"
                    borderColor={"#5EEDFF"}
                    onClick={toggleTokenOut}
                    leftIcon={
                      <Avatar
                        size="sm"
                        name={tokenOut.name ? tokenOut.name : "Out"}
                        src={
                          tokenOut.icon
                            ? tokenOut.icon
                            : "/base-logo-in-blue.png"
                        }
                      />
                    }
                  >
                    <Text>
                      {tokenOut.symbol
                        ? tokenOut.symbol
                        : "Select token"}
                    </Text>
                  </Button>
                  <SwapTokenModal isOpen={openTokenOut} onClose={closeTokenOut} handleChoseToken={handleSelectTokenOut} selectedAddr={tokenOut.address} />
                  <NumberInput
                    value={amountOut}
                    w="full"
                    size="lg"
                    borderColor={"#5EEDFF"}
                    onChange={(value) => handleSetAmountOut(value)}
                  >
                    <NumberInputField />
                  </NumberInput>
                </Flex>
              </FormControl>
            </Box>
          </VStack>
          <Button
            colorScheme="facebook"
            w={"full"}
            isLoading={isLoading}
            onClick={handleSwap}
            isDisabled={btnDisable || !account || isNaN(amountIn)}
          >
            {account ? btnText : "Please connect wallet"}
          </Button>
        </Center>
      </Center>
    </Box>
  );
}
