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
  HStack,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import {
  getSteps,
  loadBalance,
  createFtContractWithSigner,
} from "src/utils/helper";

// import { metadatas } from "src/utils/utils";
import { currencyFormat } from "src/utils/stringUtil";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { config } from "src/state/chain/config";

export default function SwapPage() {
  const [tokenIn, setTokenIn] = useState("");
  const [bIn, setBIn] = useState(BigNumber.from(0));
  const [bOut, setBOut] = useState(BigNumber.from(0));
  const [amountIn, setAmountIn] = useState("0");
  const [tokenOut, setTokenOut] = useState("");
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

  useEffect(() => {
    if (amountIn > "0") {
      if (tokenIn && bIn.lt(ethers.utils.parseUnits(amountIn, tokens.obj[tokenIn]?.decimals))) {
        handleBalanceInsufficient();
      } else {
        handleSwapAvailable();
      }
    }
  }, [tokenIn, amountIn, bIn]);

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
      if (tIn && tOut && aXOut !== "0" && tIn != tOut) {
        let steps = getSteps(tIn, tOut, pools.matrix);
        setSwapSteps(steps);
        if (steps.length < 2) {
          setBtnDisable(true)
          setBtnText("Not existed route")
        } else {
          try {
            let aIns = await dex.contract.getAmountsIn(
              ethers.utils.parseUnits(aXOut, tokens.obj[tOut]?.decimals),
              steps
            );
            setAmountIn(
              ethers.utils.formatUnits(
                aIns[0],
                tokens.obj[tIn]?.decimals
              )
            );
            setBtnDisable(false)
            setBtnText("Swap")
          } catch (e) {
            setBtnDisable(true)
            setBtnText("Not existed route")
            console.log(e)
          }
        }
      } else if (tIn && tOut && tIn != tOut) {
        let steps = getSteps(tIn, tOut, pools.matrix);
        setSwapSteps(steps);
      }
    },
    [tokens, dex, pools]
  );

  const handleGetAmountOut = useCallback(
    async (tIn, tOut, aXIn) => {
      if (tIn && tOut && aXIn !== "0" && tIn != tOut) {
        let steps = getSteps(tIn, tOut, pools.matrix);
        setSwapSteps(steps);
        if (steps.length < 2) {
          setBtnDisable(true)
          setBtnText("Not existed route")
        } else {
          try {
            let aOuts = await dex.contract.getAmountsOut(
              ethers.utils.parseUnits(aXIn, tokens.obj[tIn]?.decimals),
              steps
            );
            setAmountOut(
              ethers.utils.formatUnits(
                aOuts[aOuts.length - 1],
                tokens.obj[tOut]?.decimals
              )
            );
            setBtnDisable(false)
            setBtnText("Swap")
          } catch (e) {
            setBtnDisable(true)
            setBtnText("Not existed route")
            console.log(e)
          }
        }
      } else if (tIn && tOut && tIn != tOut) {
        let steps = getSteps(tIn, tOut, pools.matrix);
        setSwapSteps(steps);
      }
    },
    [tokens, dex, pools]
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

  const handleSelectTokenIn = useCallback(
    (value) => {
      if (value == tokenOut) {
        let oldTokenIn = tokenIn;
        setTokenOut(oldTokenIn);
        handleLoadBalance(oldTokenIn).then((res) => setBOut(res));
        handleGetAmountOut(value, oldTokenIn, amountIn);
      } else {
        handleGetAmountOut(value, tokenOut, amountIn);
      }
      setTokenIn(value);
      handleLoadBalance(value).then((res) => setBIn(res));
      closeTokenIn();
    },
    [tokenOut, handleLoadBalance, closeTokenIn, tokenIn, amountIn]
  );

  const handleSwap = async (e) => {
    setIsLoading(true);
    try {
      let minAmountOut = BigNumber.from(99).mul(ethers.utils.parseEther(amountOut)).div(BigNumber.from(100))

      const currentTimeUnix = Math.floor(Date.now() / 1000);
      // Calculate the Unix time for the next 30 minutes
      const next30MinutesUnix = currentTimeUnix + 30 * 60;
      const deadline = BigNumber.from(next30MinutesUnix);

      if (tokenIn == config[selectedChain].wrapAddress) {
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
      } else if (tokenOut == config[selectedChain].wrapAddress) {
        let erc20 = createFtContractWithSigner(tokenIn);
        let aIn = ethers.utils.parseUnits(
          amountIn,
          tokens.obj[tokenIn]?.decimals
        );
        let currentApproval = await erc20.allowance(account, config[selectedChain].dexAddress)
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
        let erc20 = createFtContractWithSigner(tokenIn);
        let aIn = ethers.utils.parseUnits(
          amountIn,
          tokens.obj[tokenIn]?.decimals
        );
        let currentApproval = await erc20.allowance(account, config[selectedChain].dexAddress)
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
      handleSelectTokenIn(tokenIn)
      handleSelectTokenOut(tokenOut)
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleSelectTokenOut = useCallback(
    (value) => {
      if (value == tokenIn) {
        let oldTokenOut = tokenOut;
        setTokenIn(oldTokenOut);
        handleLoadBalance(oldTokenOut).then((res) => setBIn(res));
        handleGetAmountOut(oldTokenOut, value, amountIn);
      } else {
        handleGetAmountOut(tokenIn, value, amountIn);
      }
      setTokenOut(value);
      handleLoadBalance(value).then((res) => setBOut(res));
      closeTokenOut();
    },
    [tokenIn, handleLoadBalance, closeTokenOut, tokenOut, amountOut, amountIn]
  );

  const handleSetAmountIn = useCallback(
    (value) => {
      setAmountIn(value);
      handleGetAmountOut(tokenIn, tokenOut, value);
    },
    [tokenIn, tokenOut]
  );

  const handleSetAmountOut = useCallback(
    (value) => {
      setAmountOut(value);
      handleGetAmountIn(tokenIn, tokenOut, value);
    },
    [tokenIn, tokenOut]
  );

  const handleSetMaxTokenIn = () => {
    setAmountIn(ethers.utils.formatUnits(bIn, tokens.obj[tokenIn]?.decimals));
  };

  //   if (!account)
  //     return (
  //       <Center>
  //         <Center w="40%" borderRadius={"md"} bgColor="#171E2E" px={4} py={6}>
  //           Please connect wallet to use this application
  //         </Center>
  //       </Center>
  //     );

  return (
    <Box
      bg="linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 100%)"
      width={"full"}
      h={{ base: "auto", md: "calc(100vh - 189px)" }}
    >
      <Center color="#">
        <Center
          w={{ base: "95%", md: "450px" }}
          h={"700px"}
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
                        tokenIn ? tokens.obj[tokenIn]?.decimals : 18
                      )
                    )}
                  </div>
                </Box>
                <Flex gap={6} flexDirection={"column"}>
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
                        aria-label="Options token in"
                        onClick={toggleTokenIn}
                        leftIcon={
                          <Avatar
                            size="sm"
                            name={tokenIn ? tokenIn : "In"}
                            src={
                              tokenIn
                                ? tokens.obj[tokenIn]?.symbol
                                : "/base-logo-in-blue.png"
                            }
                          />
                        }
                      >
                        <Text>
                          {tokenIn
                            ? tokens.obj[tokenIn]?.symbol
                            : "Select token"}
                        </Text>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent w="full" maxH="200px" overflowY="scroll">
                      <PopoverBody w="full">
                        <VStack w="full">
                          {tokens.list
                            .filter((fItem) => fItem.address !== tokenIn)
                            .map((item, index) => (
                              <Button
                                w="full"
                                justifyContent="left"
                                key={`token-option-in-${index}`}
                                leftIcon={
                                  <Avatar
                                    size="xs"
                                    name={item.symbol}
                                    src={tokens.obj[item.address]?.symbol}
                                  />
                                }
                                onClick={() => {
                                  handleSelectTokenIn(item.address);
                                }}
                              >
                                <Text>{tokens.obj[item.address]?.symbol}</Text>
                              </Button>
                            ))}
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <InputGroup>
                    <NumberInput
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
                        tokenOut ? tokens.obj[tokenOut]?.decimals : 18
                      )
                    )}
                  </div>
                </Box>
                <Flex gap={6} flexDirection={"column"}>
                  <Popover
                    matchWidth
                    isOpen={openTokenOut}
                    onClose={closeTokenOut}
                    width={"50%"}
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
                            name={tokenOut ? tokenOut : "Out"}
                            src={
                              tokenOut
                                ? tokens.obj[tokenOut]?.symbol
                                : "/base-logo-in-blue.png"
                            }
                          />
                        }
                      >
                        <Text>
                          {tokenOut
                            ? tokens.obj[tokenOut]?.symbol
                            : "Select token"}
                        </Text>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent w="full" maxH="200px" overflowY="scroll">
                      <PopoverBody w="full">
                        <VStack w="full">
                          {tokens.list
                            .filter((fItem) => fItem.address !== tokenOut)
                            .map((item, index) => (
                              <Button
                                w="full"
                                justifyContent="left"
                                key={`token-option-out-${index}`}
                                leftIcon={
                                  <Avatar
                                    size="xs"
                                    name={item.symbol}
                                    src={tokens.obj[item.address]?.symbol}
                                  />
                                }
                                onClick={() => {
                                  handleSelectTokenOut(item.address);
                                }}
                              >
                                <Text>{tokens.obj[item.address]?.symbol}</Text>
                              </Button>
                            ))}
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <NumberInput
                    value={amountOut}
                    w="full"
                    size="lg"
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
            isDisabled={btnDisable || swapSteps.length != 2 || !account}
          >
            {account ? btnText : "Please connect wallet"}
          </Button>
        </Center>
      </Center>
    </Box>
  );
}
