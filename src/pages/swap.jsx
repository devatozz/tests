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
  useDisclosure,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
  CircularProgress,
  Link,
  InputRightAddon,
  FormErrorMessage,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import React, { useState, useEffect, useCallback } from 'react';
import {
  getSteps,
  loadBalance,
  createFtContractWithSigner,
  createWETHContractWithSigner,
} from 'src/utils/helper';

// import { metadatas } from "src/utils/utils";
import { currencyFormat, formatInputAmount } from 'src/utils/stringUtil';
import { BigNumber, ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { config, noneAddress } from 'src/state/chain/config';
import SwapTokenModal from 'src/components/swap/TokensModal';
import { emptyToken } from 'src/utils/utils';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { LuArrowUpDown } from 'react-icons/lu';
import SlippageOptions from 'src/components/swap/SlippageOptions';
import loadPools from 'src/state/dex/thunks/loadPools';

export default function SwapPage() {
  const [tokenIn, setTokenIn] = useState(emptyToken);
  const [bIn, setBIn] = useState(BigNumber.from(0));
  const [bOut, setBOut] = useState(BigNumber.from(0));
  const [amountIn, setAmountIn] = useState('0');
  const [tokenOut, setTokenOut] = useState(emptyToken);
  const [amountOut, setAmountOut] = useState('0');
  const [swapSteps, setSwapSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [slippage, setSlippage] = useState(2);
  const [slippageMsg, setSlippageMsg] = useState('');
  const [deadlineTime, setDeadlineTime] = useState(10);
  const [deadlineMsg, setDeadlineMsg] = useState('');
  const toast = useToast();
  const { pools, tokens, loaded, dex } = useSelector((state) => state.dex);
  const { account, selectedChain } = useSelector((state) => state.chain);
  const dispatch = useDispatch();
  const { isOpen: openSettings, onToggle: toggleSettings } = useDisclosure();

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
  const [btnText, setBtnText] = useState('Swap');

  const handleSwapAvailable = () => {
    setBtnDisable(false);
    setBtnText('Swap');
  };

  const handleBalanceInsufficient = () => {
    setBtnDisable(true);
    setBtnText('Insufficient balance');
  };

  const handleGetAmountIn = useCallback(
    async (tIn, tOut, aXOut) => {
      let selectChain = selectedChain ? selectedChain : 'base';
      if (
        (tIn.address == noneAddress &&
          tOut.address == config[selectChain].wrapAddress) ||
        (tIn.address == config[selectChain].wrapAddress &&
          tOut.address == noneAddress)
      ) {
        tIn.address == noneAddress
          ? setSwapSteps([noneAddress, config[selectChain].wrapAddress])
          : setSwapSteps([config[selectChain].wrapAddress, noneAddress]);
        setAmountIn(aXOut);
        if (aXOut && bIn.lt(ethers.utils.parseEther(aXOut))) {
          handleBalanceInsufficient();
        } else {
          handleSwapAvailable();
        }
      } else if (
        tIn.address &&
        tOut.address &&
        aXOut !== '0' &&
        tIn.address != tOut.address
      ) {
        let steps = [];
        if (tIn.address == noneAddress) {
          steps = getSteps(
            config[selectChain].wrapAddress,
            tOut.address,
            pools.matrix
          );
        } else if (tOut.address == noneAddress) {
          steps = getSteps(
            tIn.address,
            config[selectChain].wrapAddress,
            pools.matrix
          );
        } else {
          steps = getSteps(tIn.address, tOut.address, pools.matrix);
        }
        setSwapSteps(steps);
        if (steps.length < 2) {
          setBtnDisable(true);
          setBtnText('Not existed route');
          setAmountIn('0');
        } else if (isNaN(aXOut)) {
          setBtnDisable(true);
          setBtnText('Amount out is not valid');
          setAmountIn('0');
        } else {
          try {
            let aIns = await dex.contract.getAmountsIn(
              ethers.utils.parseUnits(aXOut, tOut.decimals),
              steps
            );
            setAmountIn(ethers.utils.formatUnits(aIns[0], tIn.decimals));
            if (bIn.lt(aIns[0])) {
              handleBalanceInsufficient();
            } else {
              handleSwapAvailable();
            }
          } catch (e) {
            setBtnDisable(true);
            setBtnText('Not existed route');
            setAmountIn('0');
            console.log(e);
          }
        }
      } else if (tIn.address && tOut.address && tIn.address != tOut.address) {
        let steps = [];
        if (tIn.address == noneAddress) {
          steps = getSteps(
            config[selectChain].wrapAddress,
            tOut.address,
            pools.matrix
          );
        } else if (tOut.address == noneAddress) {
          steps = getSteps(
            tIn.address,
            config[selectChain].wrapAddress,
            pools.matrix
          );
        } else {
          steps = getSteps(tIn.address, tOut.address, pools.matrix);
        }
        setSwapSteps(steps);
      }
    },
    [tokens, dex, pools, bIn, selectedChain]
  );

  const handleGetAmountOut = useCallback(
    async (tIn, tOut, aXIn, blIn) => {
      let selectChain = selectedChain ? selectedChain : 'base';
      if (
        (tIn.address == noneAddress &&
          tOut.address == config[selectChain].wrapAddress) ||
        (tIn.address == config[selectChain].wrapAddress &&
          tOut.address == noneAddress)
      ) {
        tIn.address == noneAddress
          ? setSwapSteps([noneAddress, config[selectChain].wrapAddress])
          : setSwapSteps([config[selectChain].wrapAddress, noneAddress]);
        setAmountOut(aXIn);
        if (aXIn && blIn.lt(ethers.utils.parseEther(aXIn))) {
          handleBalanceInsufficient();
        } else {
          handleSwapAvailable();
        }
      } else if (
        tIn.address &&
        tOut.address &&
        aXIn !== '0' &&
        tIn.address != tOut.address
      ) {
        let steps = [];
        if (tIn.address == noneAddress) {
          steps = getSteps(
            config[selectChain].wrapAddress,
            tOut.address,
            pools.matrix
          );
        } else if (tOut.address == noneAddress) {
          steps = getSteps(
            tIn.address,
            config[selectChain].wrapAddress,
            pools.matrix
          );
        } else {
          steps = getSteps(tIn.address, tOut.address, pools.matrix);
        }
        setSwapSteps(steps);
        if (steps.length < 2) {
          setBtnDisable(true);
          setAmountOut('0');
          setBtnText('Not existed route');
        } else if (isNaN(aXIn)) {
          setBtnDisable(true);
          setAmountOut('0');
          setBtnText('Amount in is not valid');
        } else {
          try {
            let aOuts = await dex.contract.getAmountsOut(
              ethers.utils.parseUnits(aXIn, tIn.decimals),
              steps
            );
            setAmountOut(
              ethers.utils.formatUnits(aOuts[aOuts.length - 1], tOut.decimals)
            );
            if (blIn.lt(ethers.utils.parseUnits(aXIn, tIn.decimals))) {
              handleBalanceInsufficient();
            } else {
              handleSwapAvailable();
            }
          } catch (e) {
            setBtnDisable(true);
            setBtnText('Not existed route');
            setAmountOut('0');
            console.log(e);
          }
        }
      } else if (tIn.address && tOut.address && tIn.address != tOut.address) {
        let steps = [];
        if (tIn.address == noneAddress) {
          steps = getSteps(
            config[selectChain].wrapAddress,
            tOut.address,
            pools.matrix
          );
        } else if (tOut.address == noneAddress) {
          steps = getSteps(
            tIn.address,
            config[selectChain].wrapAddress,
            pools.matrix
          );
        } else {
          steps = getSteps(tIn.address, tOut.address, pools.matrix);
        }
        setSwapSteps(steps);
      }
    },
    [tokens, dex, pools, selectedChain]
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

  const handleSwapETHForTokens = useCallback(
    async (minAmountOut, deadline) => {
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
    },
    [amountIn, account, swapSteps]
  );

  const handleSwapTokensForETH = useCallback(
    async (minAmountOut, deadline) => {
      let erc20 = createFtContractWithSigner(tokenIn.address);
      let aIn = ethers.utils.parseUnits(amountIn, tokenIn.decimals);
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
    },
    [tokenIn, amountIn, account, selectedChain, swapSteps]
  );

  const handleSwapTokensForTokens = useCallback(
    async (minAmountOut, deadline) => {
      let erc20 = createFtContractWithSigner(tokenIn.address);
      let aIn = ethers.utils.parseUnits(amountIn, tokenIn.decimals);
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
    },
    [tokenIn, tokenOut, amountIn, account, selectedChain, swapSteps]
  );

  const handleDepositETH = useCallback(async () => {
    let weth = createWETHContractWithSigner(config[selectedChain].wrapAddress);
    let aIn = ethers.utils.parseEther(amountIn);

    let swapTx = await weth.deposit({ value: aIn });
    await swapTx.wait();
  }, [amountIn, selectedChain]);

  const handleWithdrawETH = useCallback(async () => {
    let weth = createWETHContractWithSigner(config[selectedChain].wrapAddress);
    let aIn = ethers.utils.parseEther(amountIn);

    let swapTx = await weth.withdraw(aIn);
    await swapTx.wait();
  }, [amountIn, selectedChain]);

  const handleSwap = async (e) => {
    setIsLoading(true);

    try {
      let minAmountOut = BigNumber.from(10000 - parseInt(slippage * 100))
        .mul(ethers.utils.parseUnits(amountOut, tokenOut.decimals))
        .div(BigNumber.from(10000));

      const currentTimeUnix = Math.floor(Date.now() / 1000);
      // Calculate the Unix time for the next 30 minutes
      const next30MinutesUnix = currentTimeUnix + deadlineTime * 60;
      const deadline = BigNumber.from(next30MinutesUnix);
      if (
        tokenIn.address == noneAddress &&
        tokenOut.address.toLowerCase() ==
          config[selectedChain].wrapAddress.toLowerCase()
      ) {
        await handleDepositETH();
      } else if (
        tokenIn.address.toLowerCase() ==
          config[selectedChain].wrapAddress.toLowerCase() &&
        tokenOut.address == noneAddress
      ) {
        await handleWithdrawETH();
      } else if (tokenIn.address == noneAddress) {
        await handleSwapETHForTokens(minAmountOut, deadline);
      } else if (tokenOut.address == noneAddress) {
        await handleSwapTokensForETH(minAmountOut, deadline);
      } else {
        await handleSwapTokensForTokens(minAmountOut, deadline);
      }

      toast({
        status: 'success',
        duration: 5000,
        title: 'Swap success',
        isClosable: true,
      });
      dispatch(loadPools());
      handleSelectTokenIn(tokenIn);
      handleSelectTokenOut(tokenOut);
    } catch (e) {
      toast({
        status: 'error',
        duration: 5000,
        title: 'Transaction failed',
        isClosable: true,
      });
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleSelectTokenIn = useCallback(
    async (value) => {
      let blIn = await handleLoadBalance(value.address);

      setBIn(blIn);
      if (value.address == tokenOut.address) {
        let oldTokenIn = tokenIn;
        if (oldTokenIn.address) {
          setTokenOut(oldTokenIn);
          handleLoadBalance(oldTokenIn.address).then((res) => setBOut(res));
        } else {
          setTokenOut(emptyToken);
          setBOut(BigNumber.from(0));
        }
        handleGetAmountOut(value, oldTokenIn, amountIn, blIn);
      } else {
        handleGetAmountOut(value, tokenOut, amountIn, blIn);
      }
      setTokenIn(value);
      closeTokenIn();
    },
    [tokenOut, tokenIn, amountIn]
  );

  const handleSelectTokenOut = useCallback(
    async (value) => {
      handleLoadBalance(value.address).then((res) => setBOut(res));
      let blIn = bIn;
      if (value.address == tokenIn.address) {
        let oldTokenOut = tokenOut;
        if (oldTokenOut.address) {
          setTokenIn(oldTokenOut);
          blIn = await handleLoadBalance(oldTokenOut.address);
          setBIn(blIn);
        } else {
          setTokenIn(emptyToken);
          setBIn(BigNumber.from(0));
        }
        handleGetAmountOut(oldTokenOut, value, amountIn, blIn);
      } else {
        handleGetAmountOut(tokenIn, value, amountIn, blIn);
      }
      setTokenOut(value);
      closeTokenOut();
    },
    [tokenIn, tokenOut, amountIn, bIn]
  );

  const handleReverseTokens = useCallback(() => {
    let oldTokenIn = tokenIn;
    let oldTokenOut = tokenOut;
    let oldBIn = bIn;
    let oldBOut = bOut;
    setBIn(oldBOut);
    setBOut(oldBIn);
    setTokenIn(oldTokenOut);
    setTokenOut(oldTokenIn);
    if (oldTokenIn.address && oldTokenOut.address) {
      handleGetAmountOut(oldTokenOut, oldTokenIn, amountIn, oldBOut);
    }
  }, [tokenOut, tokenIn, bIn, bOut, amountIn.amountOut]);

  const handleSetAmountIn = useCallback(
    (value) => {
      const amount = formatInputAmount(value);
      setAmountIn(amount);
      handleGetAmountOut(tokenIn, tokenOut, amount, bIn);
    },
    [tokenIn, tokenOut, bIn]
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
      ethers.utils.formatUnits(bIn, tokenIn.decimals),
      bIn
    );
  };

  const handleChangeSlippage = useCallback((value) => {
    if (!value) {
      setSlippage('');
      setSlippageMsg('Invalid slippage tolerance');
    } else if (isNaN(value)) {
      setSlippage(value);
      setSlippageMsg('Invalid slippage tolerance');
    } else {
      let floorValue = 0;
      if (value.length && value[value.length - 1] == '.') {
        setSlippage(value);
      } else if (value == 0) {
        setSlippage(value);
        setSlippageMsg(
          'Slippage tolerance must be greater than 0.1% and less than or equal 100%'
        );
      } else {
        floorValue = Math.floor(parseFloat(value) * 100) / 100;
        setSlippage(floorValue);
      }
      if (value < 0.1 || value > 100) {
        setSlippageMsg(
          'Slippage tolerance must be greater than 0.1% and less than or equal 100%'
        );
      }
    }
  }, []);

  const handleChangeDeadline = useCallback((value) => {
    if (!value) {
      setDeadlineTime('');
      setDeadlineMsg('Invalid deadline');
    } else if (isNaN(value)) {
      setDeadlineTime(value);
      setDeadlineMsg('Invalid deadline');
    } else {
      setDeadlineTime(parseInt(value));
      if (value < 1 || value > 60) {
        setDeadlineMsg(
          'Deadline time must be greater than 1 minutes and less than or equal 60 minutes'
        );
      }
    }
  }, []);

  useEffect(() => {
    if (!isNaN(slippage) && slippage >= 0.1 && slippage <= 100) {
      setSlippageMsg('');
    }
  }, [slippage]);

  useEffect(() => {
    if (!isNaN(deadlineTime) && deadlineTime >= 1 && deadlineTime <= 60) {
      setDeadlineMsg('');
    }
  }, [deadlineTime]);
  if (!tokens.loaded || !pools.loaded) {
    return (
      <Box
        bg="linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 90%)"
        pt={8}
        width={'full'}
        minH={{
          base: 'calc(100vh - 150px)',
          md: 'calc(100vh - 170px)',
        }}
      >
        <Center>
          <Center
            w={{ base: '95%', md: '450px' }}
            borderRadius={"md"}
            bgColor="white"
            px={{ base: 0, md: 4 }}
            py={6}
            minH={500}
            h={600}
          >
            <CircularProgress size='60px' isIndeterminate color='blue.600' />
          </Center>
        </Center>
      </Box>
    );
  }

  return (
    <Box
      bg='linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 90%)'
      width={'full'}
      minH={{
        base: 'calc(100vh - 150px)',
        md: 'calc(100vh - 170px)',
      }}
    >
      <Center color='#'>
        <Center
          w={{ base: '95%', md: '450px' }}
          h={openSettings ? '800px' : '600px'}
          mt={'50px'}
          borderRadius={'md'}
          bgColor='white'
          px={4}
          py={6}
          flex
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          <Text fontSize='2xl'>Swap</Text>
          <VStack gap={'20px'} w='full'>
            <Box w='full'>
              <FormControl w='full'>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <FormLabel>Token In</FormLabel>
                  <div>
                    Balance:{' '}
                    {currencyFormat(
                      ethers.utils.formatUnits(bIn, tokenIn.decimals)
                    )}
                  </div>
                </Box>
                <Flex gap={6} flexDirection={'column'}>
                  <Button
                    borderColor={'#5EEDFF'}
                    colorScheme='telegram'
                    justifyContent='left'
                    minW='200px'
                    size='lg'
                    variant='outline'
                    aria-label='Options token in'
                    onClick={toggleTokenIn}
                    leftIcon={
                      <Avatar
                        size='sm'
                        name={tokenIn.symbol ? tokenIn.symbol : 'In'}
                        src={
                          tokenIn.icon
                            ? tokenIn?.icon
                            : '/base-logo-in-blue.png'
                        }
                      />
                    }
                  >
                    {tokenIn.symbol ? tokenIn.symbol : 'Select token'}
                  </Button>
                  <SwapTokenModal
                    isOpen={openTokenIn}
                    onClose={closeTokenIn}
                    handleChoseToken={handleSelectTokenIn}
                    selectedAddr={tokenIn.address}
                  />
                  <InputGroup>
                    <NumberInput
                      borderColor={'#5EEDFF'}
                      value={amountIn}
                      w='full'
                      size='lg'
                      onChange={(value) => handleSetAmountIn(value)}
                    >
                      <NumberInputField />
                    </NumberInput>
                    <InputRightElement width='4.5rem' m='0.25rem'>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={handleSetMaxTokenIn}
                      >
                        Max
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>
            </Box>
            <Center w='full'>
              <IconButton
                onClick={handleReverseTokens}
                isRound
                colorScheme='telegram'
                icon={<Icon as={LuArrowUpDown} />}
              />
            </Center>
            <Box w='full'>
              <FormControl w='full'>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <FormLabel>Token Out</FormLabel>
                  <div>
                    Balance:{' '}
                    {currencyFormat(
                      ethers.utils.formatUnits(bOut, tokenOut.decimals)
                    )}
                  </div>
                </Box>
                <Flex gap={6} flexDirection={'column'}>
                  <Button
                    colorScheme='telegram'
                    justifyContent='left'
                    minW='200px'
                    size='lg'
                    variant='outline'
                    aria-label='Options token out'
                    borderColor={'#5EEDFF'}
                    onClick={toggleTokenOut}
                    leftIcon={
                      <Avatar
                        size='sm'
                        name={tokenOut.name ? tokenOut.name : 'Out'}
                        src={
                          tokenOut.icon
                            ? tokenOut.icon
                            : '/base-logo-in-blue.png'
                        }
                      />
                    }
                  >
                    <Text>
                      {tokenOut.symbol ? tokenOut.symbol : 'Select token'}
                    </Text>
                  </Button>
                  <SwapTokenModal
                    isOpen={openTokenOut}
                    onClose={closeTokenOut}
                    handleChoseToken={handleSelectTokenOut}
                    selectedAddr={tokenOut.address}
                  />
                  <NumberInput
                    value={amountOut}
                    w='full'
                    size='lg'
                    borderColor={'#5EEDFF'}
                    onChange={(value) => handleSetAmountOut(value)}
                  >
                    <NumberInputField />
                  </NumberInput>
                </Flex>
              </FormControl>
            </Box>
            <Box w='full'>
              <Link size='sm' color='blue.600' onClick={toggleSettings}>
                Advanced Settings <ChevronDownIcon />
              </Link>
              {openSettings && (
                <>
                  <FormControl isInvalid={slippageMsg != ''}>
                    <FormLabel>Slippage Tolerance</FormLabel>
                    <InputGroup>
                      <NumberInput
                        value={slippage}
                        w='full'
                        borderColor={'#5EEDFF'}
                        onChange={(value) => handleChangeSlippage(value)}
                      >
                        <NumberInputField />
                      </NumberInput>
                      <InputRightAddon>%</InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>{slippageMsg}</FormErrorMessage>

                    <SlippageOptions
                      setSlippage={handleChangeSlippage}
                      slippage={slippage}
                    />
                  </FormControl>
                  <FormControl mt={3} isInvalid={deadlineMsg != ''}>
                    <FormLabel>Deadline</FormLabel>
                    <InputGroup>
                      <NumberInput
                        value={deadlineTime}
                        w='full'
                        borderColor={'#5EEDFF'}
                        onChange={(value) => handleChangeDeadline(value)}
                      >
                        <NumberInputField />
                      </NumberInput>
                      <InputRightAddon>minutes</InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>{deadlineMsg}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Box>
          </VStack>
          <Button
            colorScheme='facebook'
            w={'full'}
            isLoading={isLoading}
            onClick={handleSwap}
            isDisabled={
              btnDisable ||
              !account ||
              isNaN(amountIn) ||
              deadlineMsg != '' ||
              slippageMsg != ''
            }
          >
            {account ? btnText : 'Please connect wallet'}
          </Button>
        </Center>
      </Center>
    </Box>
  );
}
