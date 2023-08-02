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
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { currencyFormat, formatInputAmount } from "src/utils/stringUtil";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { config } from "src/state/chain/config";

export default function LiquidityItem({
  lpToken,
  pool,
  handleRemoveLiquidity,
  loading,
}) {
  const [share, setShare] = useState("0");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [removeAmount, setRemoveAmount] = useState("0");
  const { tokens } = useSelector((state) => state.dex);
  const { selectedChain } = useSelector((state) => state.chain);

  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState("Add Liquidity");

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
  }, [lpToken.balance, removeAmount]);

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

  // useEffect(() => {
  //   const getPoolShare = () => {
  //     const balance = Number(lpToken.balance);
  //     const poolTotalSupply = Number(pool.total_supply);
  //     if (balance > 0 && poolTotalSupply > 0) {
  //       const share = (balance / poolTotalSupply) * 100;
  //       setShare(share.toFixed(2));
  //     }
  //   };

  //   getPoolShare();
  // }, [lpToken, pool]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRemoveLiquidity(removeAmount, lpToken);
    setRemoveAmount("0");
    onClose();
  };

  const handleSetMaxAmount = () => {
    setRemoveAmount(ethers.utils.formatUnits(lpToken.balance));
  };

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
              name={tokens.obj[lpToken.token0]?.symbol}
              src={tokens.obj[lpToken.token0]?.icon}
            />
            {"  "}
            {tokens.obj[lpToken.token0]?.symbol} -{"  "}
            <Avatar
              size="xs"
              name={tokens.obj[lpToken.token1]?.symbol}
              src={tokens.obj[lpToken.token1]?.icon}
            />
            {"  "}
            {tokens.obj[lpToken.token1]?.symbol}
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
          label={`Pooled ${tokens.obj[lpToken.token0]?.symbol}:`}
          value={
            lpToken.reverses._reserve0 &&
            currencyFormat(
              ethers.utils.formatUnits(
                lpToken.reverses._reserve0,
                tokens.obj[lpToken.token0]?.decimals
              )
            )
          }
        />
        <PoolDetail
          label={`Pooled ${tokens.obj[lpToken.token1]?.symbol}:`}
          value={
            lpToken.reverses._reserve1 &&
            currencyFormat(
              ethers.utils.formatUnits(
                lpToken.reverses._reserve1,
                tokens.obj[lpToken.token1]?.decimals
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
            <Text fontWeight="bold">{`LP tokens balance: ${ethers.utils.formatEther(
              lpToken.balance
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
                    name={tokens.obj[lpToken.token0]?.symbol}
                    src={tokens.obj[lpToken.token0]?.icon}
                  />
                  <Text ml={2}>{tokens.obj[lpToken.token0]?.symbol}</Text>
                </Flex>
                <Flex alignItems="center" m={2}>
                  <Avatar
                    size="xs"
                    name={tokens.obj[lpToken.token1]?.symbol}
                    src={tokens.obj[lpToken.token1]?.icon}
                  />
                  <Text ml={2}>{tokens.obj[lpToken.token1]?.symbol}</Text>
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
