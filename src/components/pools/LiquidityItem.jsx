import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  AccordionIcon,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  useDisclosure,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { currencyFormat, formatInputAmount } from "src/utils/stringUtil";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { config } from "src/state/chain/config";
import { emptyToken } from "src/utils/utils";
import { getTokenData } from "src/utils/helper";
import { usePublicClient, useWalletClient } from 'wagmi';
import { usePairContract } from 'src/utils/hooks';

export default function LiquidityItem({
  lpToken,
  handleRemoveLiquidity,
  loading,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [removeAmount, setRemoveAmount] = useState("0");
  const { obj: tokenObj, loaded } = useSelector((state) => state.dex.tokens);
  const selectedChain = useSelector((state) => state.chain.selectedChain);

  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState("Add Liquidity");
  const [token1Info, setToken1Info] = useState(emptyToken)
  const [token2Info, setToken2Info] = useState(emptyToken)
  const selectChain = useMemo(() => selectedChain ? selectedChain : "base", [selectedChain]);

  const { data: walletClient } = useWalletClient()
  const { data: publicClient } = usePublicClient()
  const pairContract = useMemo(() => usePairContract(lpToken.pair, walletClient, publicClient), [walletClient, publicClient])

  const handleOpenModal = () => {
    onOpen();
  };

  const handleBalanceOk = () => {
    setBtnDisable(false);
    setBtnText("Submit");
  };

  const handleBalanceInsufficient = () => {
    setBtnDisable(true);
    setBtnText("Insufficient balance");
  };

  const handleRemoveAmountChange = (value) => {
    try {
      setRemoveAmount(formatInputAmount(value));
    } catch (ex) {
      console.log("Ivalid input amount");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRemoveLiquidity(removeAmount, lpToken, pairContract);
    setRemoveAmount("0");
    onClose();
  };

  const handleSetMaxAmount = () => {
    setRemoveAmount(ethers.utils.formatUnits(lpToken.balance));
  };

  const handleLoadTokenInfo = useCallback(async () => {
    if (lpToken.token0 == config[selectChain].wrapAddress) {
      setToken1Info({ ...tokenObj[lpToken.token0], icon: "/eth.png", symbol: "ETH", name: "Ether" })
    } else if (tokenObj[lpToken.token0]) {
      setToken1Info(tokenObj[lpToken.token0])
    } else {
      const tokenFetch = await getTokenData(lpToken.token0)
      setToken1Info({ ...tokenFetch, disable: false, icon: "" })
    }

    if (lpToken.token1 == config[selectChain].wrapAddress) {
      setToken2Info({ ...tokenObj[lpToken.token0], icon: "/eth.png", symbol: "ETH", name: "Ether" })
    } else if (tokenObj[lpToken.token1]) {
      setToken2Info(tokenObj[lpToken.token1])
    } else {
      const tokenFetch = await getTokenData(lpToken.token1)
      setToken2Info({ ...tokenFetch, disable: false, icon: "" })
    }
  }, [tokenObj, lpToken, selectChain])

  useEffect(() => {
    const balanceBN = BigNumber.from(lpToken.balance);
    try {
      if (balanceBN.lt(ethers.utils.parseEther(removeAmount))) {
        handleBalanceInsufficient();
      } else {
        handleBalanceOk();
      }
    } catch (ex) {
      handleBalanceInsufficient();
    }
  }, [lpToken, removeAmount]);

  useEffect(() => {
    if (loaded) {
      handleLoadTokenInfo()
    }
  }, [loaded, selectedChain])

  return (
    <AccordionItem
      borderWidth="1px"
      borderRadius="md"
      borderColor={"#5EEDFF"}
      m={3}
      bg="white"
    // bgGradient="linear(to-r, blue.600, blue.400)"
    >
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="bold">
            <Avatar
              size="xs"
              name={token1Info.symbol}
              src={token1Info.icon}
            />
            {"  "}
            {token1Info.symbol} -{"  "}
            <Avatar
              size="xs"
              name={token2Info.symbol}
              src={token2Info.icon}
            />
            {"  "}
            {token2Info.symbol}
          </Box>
          <Text fontWeight="bold" mr={2}>
            Manage
          </Text>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <PoolDetail
          label="Your total LP tokens:"
          value={
            lpToken.balance &&
            currencyFormat(ethers.utils.formatUnits(lpToken.balance))
          }
        />
        <PoolDetail
          label={`Pooled ${token1Info.symbol}:`}
          value={
            lpToken.reserves._reserve0 &&
            currencyFormat(
              ethers.utils.formatUnits(
                lpToken.reserves._reserve0,
                token1Info.decimals
              )
            )
          }
        />
        <PoolDetail
          label={`Pooled ${token2Info.symbol}:`}
          value={
            lpToken.reserves._reserve1 &&
            currencyFormat(
              ethers.utils.formatUnits(
                lpToken.reserves._reserve1,
                token2Info.decimals
              )
            )
          }
        />
        <Flex justifyContent="flex-end" mt={5}>
          <Button colorScheme="red" onClick={handleOpenModal} size="sm">
            Remove Liquidity
          </Button>
        </Flex>
      </AccordionPanel>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent bg="white" color="black">
          <ModalHeader>Remove Liquidity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">{`LP tokens balance: ${currencyFormat(
              ethers.utils.formatEther(lpToken.balance)
            )}`}</Text>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <NumberInput
                  value={removeAmount}
                  onChange={(value) => handleRemoveAmountChange(value)}
                  w="full"
                  size="lg"
                  borderColor={"#5EEDFF"}
                >
                  <NumberInputField />
                </NumberInput>
                <InputRightElement width="4.5rem" m="0.25rem">
                  <Button h="1.75rem" size="sm" onClick={handleSetMaxAmount}>
                    Max
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <ChevronDownIcon boxSize={6} />
            </Box>
            <Box
              mt={4}
              border="1px"
              borderColor="#5EEDFF"
              borderRadius="md"
              p={4}
            >
              <Flex flexDirection="column" alignItems="flex-end">
                <Text>You will receive:</Text>
                <Flex alignItems="center" m={2}>
                  <Avatar
                    size="xs"
                    name={token1Info.symbol}
                    src={token1Info.icon}
                  />
                  <Text ml={2}>{token1Info.symbol}</Text>
                </Flex>
                <Flex alignItems="center" m={2}>
                  <Avatar
                    size="xs"
                    name={token2Info.symbol}
                    src={token2Info.icon}
                  />
                  <Text ml={2}>{token2Info.symbol}</Text>
                </Flex>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={loading}
              isDisabled={btnDisable || removeAmount == "0"}
            >
              {btnText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AccordionItem>
  );
}

const PoolDetail = ({ label, value }) => (
  <Flex mb={2}>
    <Box width="60%" fontWeight="bold">
      {label}
    </Box>
    <Box width="40%" textAlign="right">
      {value}
    </Box>
  </Flex>
);
