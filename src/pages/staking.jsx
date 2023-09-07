"use client";
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Flex,
  Text,
  Stack,
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";
// state
import {
  approveAllTokens,
  harvestRewards,
  fetchTotalRewards,
  getNFTStakedBalance,
  isApprovedTokens,
  loadUserNftBalance,
} from "src/state/stake/slice";
import { stakeNft } from "src/state/stake/thunks/stakeNft";
import { unstake } from "src/state/stake/thunks/unstake";

export default function Staking() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [amount, setAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const { selectedChain } = useSelector((state) => state.chain);
  const { address } = useAccount();
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnStakeModalOpen, setIsUnStakeModalOpen] = useState(false);
  const [buttonStatuses, setButtonStatuses] = useState([]);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isHarvest, setIsHarvest] = useState(false);
  const [approvalAllToken, setAprovalAllToken] = useState(false);
  const [pools, setPools] = useState(10);
  const selectChain = useMemo(
    () => (selectedChain ? selectedChain : "base"),
    [selectedChain]
  );
  const addressMemo = useMemo(() => address, [address]);

  // state
  const { totalRewards, totalNftStacked, userBalance } = useSelector(
    (state) => state.stake
  );
  const isApproved = useSelector((state) => state.stake.isApproved);
  const poolsInfor = [
    {
      pool: 10,
      staked: totalNftStacked,
      apr: "100%",
      need: 10 - totalNftStacked,
    },
    {
      pool: 30,
      staked: totalNftStacked,
      apr: "200%",
      need: 30 - totalNftStacked,
    },
    {
      pool: 60,
      staked: totalNftStacked,
      apr: "300%",
      need: 60 - totalNftStacked,
    },
    {
      pool: 100,
      staked: totalNftStacked,
      apr: "500%",
      need: 100 - totalNftStacked,
    },
    {
      pool: 150,
      staked: totalNftStacked,
      apr: "800%",
      need: 150 - totalNftStacked,
    },
  ];

  useEffect(() => {
    const minimumStakedValues = [10, 30, 60, 100, 150];
    const activePoolIndex = minimumStakedValues.findIndex(
      (value, index, array) =>
        totalNftStacked < value &&
        (index === 0 || totalNftStacked >= array[index - 1])
    );
    const btStatus = poolsInfor.map((poolInfo, index) => {
      return index === activePoolIndex;
    });
    setButtonStatuses(btStatus);
  }, [totalNftStacked]);

  // stake
  const handleSubmitStake = useCallback(
    async (e, pool) => {
      e.preventDefault();
      const amountError = validateAmount(amount, userBalance, pool);
      if (amountError !== "") {
        toast({
          title: "Error!",
          description: amountError,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setIsStaking(true);
      try {
        const response = await dispatch(stakeNft({ amount }));
        if (response.meta.requestStatus === "fulfilled") {
          setIsStakeModalOpen(false);
          setAmount(0);
          dispatch(getNFTStakedBalance(address));
          dispatch(fetchTotalRewards(address));
          dispatch(loadUserNftBalance(address));
          toast({
            title: "Success!",
            description: "Your NFTs have been staked successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          const error = response.error;
          if (error && error.message === "Failed to stake nft") {
            toast({
              title: "Error!",
              description: "Failed to stake NFTs. Please try again!",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsStaking(false);
            setIsStakeModalOpen(false);
          } else {
            toast({
              title: "Error!",
              description: "An error occurred while staking NFTs.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsStaking(false);
            setIsStakeModalOpen(false);
          }
        }
      } catch (error) {
        toast({
          title: "Error!",
          description: "An error occurred while staking NFTs.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsStaking(false);
        setIsStakeModalOpen(false);
      }
    },
    [dispatch, toast, address, amount, userBalance]
  );
  // separate
  const handleApprove = async () => {
    setAprovalAllToken(true);
    try {
      const response = await dispatch(approveAllTokens(address));
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(isApprovedTokens({ owner: address }));
        toast({
          title: "Success!",
          description: "Approved successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const error = response.error;
        if (error && error.message === "Failed to approve all token") {
          toast({
            title: "Error!",
            description: "Failed to approve all token. Please try again!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setAprovalAllToken(false);
        } else {
          toast({
            title: "Error!",
            description: "An error occurred while harvest.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setAprovalAllToken(false);
        }
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while approve.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setAprovalAllToken(false);
    }
  };
  const handleApproveAllTokens = async () => {
    dispatch(approveAllTokens(address));
  };
  const handleCheckIsApprove = async () => {
    const response = await dispatch(isApprovedTokens({ owner: address }));
  };

  // havest rewards
  const handleHarvestRewards = async () => {
    setIsHarvest(true);
    try {
      const response = await dispatch(harvestRewards());
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(fetchTotalRewards(address));
        toast({
          title: "Success!",
          description: "Harvest successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const error = response.error;
        if (error && error.message === "Failed to harvest rewards") {
          toast({
            title: "Error!",
            description: "Failed to harvest. Please try again!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsHarvest(false);
        } else {
          toast({
            title: "Error!",
            description: "An error occurred while harvest.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsHarvest(false);
        }
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while harvest.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsHarvest(false);
    }
  };
  // unstake

  const handleSubmitUnStake = async (e) => {
    e.preventDefault();
    const unstakeAmountError = validateUnstakeAmount(
      unstakeAmount,
      totalNftStacked
    );
    if (unstakeAmountError !== "") {
      toast({
        title: "Error!",
        description: unstakeAmountError,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsUnstaking(true);
    try {
      const response = await dispatch(unstake({ unstakeAmount }));
      if (response.meta.requestStatus === "fulfilled") {
        setIsUnStakeModalOpen(false);
        setUnstakeAmount(0);
        dispatch(getNFTStakedBalance(address));
        dispatch(fetchTotalRewards(address));
        dispatch(loadUserNftBalance(address));
        toast({
          title: "Success!",
          description: "Your NFTs have been unstaked successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const error = response.error;
        if (error && error.message === "Failed to unstake nft") {
          toast({
            title: "Error!",
            description: "Failed to unstake NFTs. Please try again!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsUnstaking(false);
          setIsUnStakeModalOpen(false);
        } else {
          toast({
            title: "Error!",
            description: "An error occurred while unstaking NFTs.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsUnstaking(false);
          setIsUnStakeModalOpen(false);
        }
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while unstaking NFTs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUnstaking(false);
      setIsUnStakeModalOpen(false);
    }
  };
  // validate input
  const validateAmount = (value, balance, pool) => {
    const maxStake = 150 - totalNftStacked;
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return "Amount must be a valid number greater than zero";
    }
    if (num > parseFloat(balance)) {
      return "Amount cannot be greater than your NFT balance";
    }
    if (num < parseFloat(pool - totalNftStacked)) {
      return `Amount must be greater than or equal to ${
        pool - totalNftStacked
      }`;
    }
    if (num > maxStake) {
      return `You cannot stake more than ${maxStake} NFTs`;
    }
    return "";
  };
  const validateUnstakeAmount = (value, staked) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return "Unstake amount must be a valid number greater than zero";
    }
    if (num > parseFloat(staked)) {
      return "Unstake amount cannot be greater than your staked NFT balance";
    }
    return "";
  };
  // get total reward
  useEffect(() => {
    dispatch(fetchTotalRewards(address));
  }, [address, dispatch, amount, unstakeAmount, selectChain]);
  useEffect(() => {
    dispatch(getNFTStakedBalance(address));
  }, [address, dispatch, amount, unstakeAmount, selectChain]);
  useEffect(() => {
    dispatch(loadUserNftBalance(address));
  }, [address, dispatch, amount, unstakeAmount, selectChain]);

  useEffect(() => {
    handleCheckIsApprove();
  }, [address, dispatch]);
  useEffect(() => {
    handleCheckIsApprove();
  }, []);
  return (
    <Box
      bg="linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 90%)"
      width={"full"}
      minH={{
        base: "calc(100vh - 150px)",
        md: "calc(100vh - 170px)",
      }}
    >
      {address === undefined ? (
        <Text
          textAlign="center"
          fontSize={"3xl"}
          color={"white"}
          pt={"10%"}
          h={{ base: "calc(100vh - 190px)" }}
        >
          PLEASE CONNECT WALLET FIRST !
        </Text>
      ) : (
        <Container maxW={"7xl"} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Flex>
              <Image
                rounded={"md"}
                alt={"NFT image"}
                src="/nft.PNG"
                objectFit={"cover"}
              />
            </Flex>
            <Stack spacing={4}>
              <Stack
                spacing={6}
                borderBottom="1px dashed #fff"
                paddingBottom={9}
              >
                <Text color={"#fff"} fontSize={"42px"}>
                  Pira NFT Staking
                </Text>
                <Text color={"#D0D0D0"} fontSize={"18px"}>
                  Introducing Pira NFT Staking from Pira Finance. The Pira Fam
                  now has the chance to increase the $PIRA earned by staking
                  your Pira NFT with an attractive APR! You must own enough NFTs
                  for each pool to be eligible for staking and earn $PIRA.{" "}
                  <br /> <br />
                  Continue earning $PIRA through our staking mechanism and have
                  fun!
                </Text>
              </Stack>
              <Box
                border="2px solid #D4FFF2 "
                textAlign="center"
                padding="15px "
                borderRadius="10px"
                marginTop="8"
              >
                <Text fontSize="32px" color="#fff">
                  Your NFT Balance:
                  <Box as="span" color="#39ACFF" margin={"0px 20px"}>
                    {userBalance}
                  </Box>
                </Text>
              </Box>
            </Stack>
          </SimpleGrid>
          <Container maxW={"5xl"} py={12}>
            <Center marginTop={24}>
              <Box width={"full"} border="3px solid #D4FFF2">
                <Center>
                  <Flex flexDirection={"column"}>
                    <Box>
                      <Text
                        color={"#fff"}
                        fontSize={{ base: "32px", md: "48px" }}
                        paddingTop={"30px"}
                        width={"full"}
                        textAlign={"Start"}
                        padding={{ base: "30px 10px", md: "30px 0px 0px" }}
                      >
                        Total NFTs Staked: {totalNftStacked}
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Text
                        color={"#fff"}
                        fontSize={{ base: "32px", md: "48px" }}
                        width={"full"}
                        textAlign={"Start"}
                      >
                        Total Rewards:
                        <Box as="span" color="#39ACFF" margin={"0px 20px"}>
                          {Number(totalRewards).toFixed(2)} xPira
                        </Box>
                      </Text>
                    </Box>
                  </Flex>
                </Center>

                <Flex
                  textAlign="center"
                  justifyContent={"center"}
                  paddingBottom={"30px"}
                  gap={8}
                >
                  <Box textAlign="center" borderRadius="10px" marginTop="8">
                    <Text fontSize="32px" color="#fff">
                      <Button
                        onClick={handleHarvestRewards}
                        isLoading={isHarvest}
                        isDisabled={isHarvest}
                        padding={"0px 40px"}
                        css={{
                          ":hover": {
                            color: "green",
                            // background: "#cacfd5",
                          },
                        }}
                      >
                        {isHarvest
                          ? "Harvesting Rewards..."
                          : "Harvest Rewards"}
                      </Button>
                    </Text>
                  </Box>
                  <Box textAlign="center" borderRadius="10px" marginTop="8">
                    <Text fontSize="32px" color="#fff">
                      <Button
                        onClick={() => setIsUnStakeModalOpen(true)}
                        padding={"0px 40px"}
                        css={{
                          ":hover": {
                            color: "green",
                            // background: "#cacfd5",
                          },
                        }}
                      >
                        Unstake
                      </Button>
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Center>

            <Center marginTop={24} justifyContent="flex-start">
              <Text
                color={"#fff"}
                fontSize={"48px"}
                borderBottom="1px solid #D4FFF2"
                padding={2}
                textAlign="left"
              >
                All Pools
              </Text>
            </Center>

            {poolsInfor?.map((el, index) => (
              <Center marginTop={12} key={index + 1}>
                <Box
                  backgroundColor="#D4FFF2"
                  width="100%"
                  borderRadius={"10px"}
                  padding="10px 20px"
                >
                  <Flex justifyContent="space-between">
                    <Text
                      color="#1F2B7A"
                      fontSize={{ base: "32px", md: "42px" }}
                    >
                      {el.pool} Pira NFTs
                    </Text>
                    <Box
                      padding="8px 16px"
                      backgroundColor="#1E2A76"
                      textAlign="center"
                      borderRadius="10px"
                    >
                      <Text
                        color="#00FF85"
                        padding="0px"
                        fontSize={{ base: "28px", md: "36px" }}
                      >
                        APR: {el.apr}{" "}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Text color="#1F2B7A" fontSize="24px">
                      {" "}
                      Balance: {el.staked > el.pool
                        ? el.pool
                        : el.staked} / {el.pool}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between" marginTop={6} gap={16}>
                    <Box
                      backgroundColor="#1E2A76"
                      textAlign="center"
                      borderRadius="10px"
                      flex={"3"}
                    >
                      {el.staked >= el.pool ? (
                        <>
                          <Button
                            justifyContent="center"
                            size={{ base: "md", md: "lg" }}
                            variant="outline"
                            aria-label="Options token out"
                            onClick={() => setIsStakeModalOpen(true)}
                            isDisabled={true}
                            css={{
                              background: "#1E2A76",
                              padding: "10px",
                              fontSize: "28px",
                              border: "none",
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              color: "#D4FFF2",
                              ":hover": {
                                background: "#2e3ea5",
                              },
                            }}
                          >
                            <Text> Staked {el.pool} NFT</Text>
                          </Button>
                        </>
                      ) : (
                        <>
                          {isApproved ? (
                            <Button
                              justifyContent="center"
                              size="lg"
                              variant="outline"
                              aria-label="Stake NFT"
                              onClick={() => {
                                setPools(el.pool);
                                setIsStakeModalOpen(true);
                              }}
                              isDisabled={!buttonStatuses[index]}
                              css={{
                                background: "#1E2A76",
                                padding: "10px",
                                fontSize: "28px",
                                border: "none",
                                width: "100%",
                                height: "100%",
                                margin: "0px",
                                color: "#D4FFF2",
                                ":hover": {
                                  background: "#2e3ea5",
                                },
                              }}
                            >
                              <Text>Need More {el.need} to Stake</Text>
                            </Button>
                          ) : (
                            <Button
                              justifyContent="center"
                              size="lg"
                              variant="outline"
                              aria-label="Approve NFT"
                              onClick={handleApprove}
                              isDisabled={approvalAllToken}
                              isLoading={approvalAllToken}
                              css={{
                                background: "#1E2A76",
                                padding: "10px",
                                fontSize: "28px",
                                border: "none",
                                width: "100%",
                                height: "100%",
                                margin: "0px",
                                color: "#D4FFF2",
                                ":hover": {
                                  background: "#2e3ea5",
                                },
                              }}
                            >
                              {approvalAllToken
                                ? "Approving..."
                                : "Approve Your NFTs"}
                            </Button>
                          )}
                        </>
                      )}
                    </Box>
                  </Flex>
                </Box>
              </Center>
            ))}
          </Container>

          <Modal
            isOpen={isStakeModalOpen}
            onClose={() => setIsStakeModalOpen(false)}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="3xl">Stake Your NFT</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmitStake}>
                  <Stack spacing={4}>
                    <Box>
                      <label htmlFor="amount" fontSize="xl">
                        Amount:
                      </label>
                      <Input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fontSize="lg"
                        marginTop={2}
                      />
                    </Box>
                    <Box>
                      <Text fontSize="lg">
                        Your NFT Balance : {userBalance}
                      </Text>
                    </Box>
                    <Button
                      type="submit"
                      isLoading={isStaking}
                      isDisabled={isStaking}
                      colorScheme="green"
                      onClick={(e) => handleSubmitStake(e, pools)}
                    >
                      {isStaking ? "Staking your NFTs..." : "Stake"}
                    </Button>
                  </Stack>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsStakeModalOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={isUnStakeModalOpen}
            onClose={() => setIsUnStakeModalOpen(false)}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="3xl">Unstake Your NFT</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmitUnStake}>
                  <Stack spacing={4}>
                    <Box>
                      <label htmlFor="unstake-amount" fontSize="xl">
                        Amount:
                      </label>
                      <Input
                        type="number"
                        id="unstake-amount"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                        fontSize="lg"
                        marginTop={2}
                      />
                    </Box>
                    <Box>
                      <Text fontSize="lg">
                        Your NFT Staked : {totalNftStacked}
                      </Text>
                    </Box>
                    <Button
                      type="submit"
                      isLoading={isUnstaking}
                      isDisabled={isUnstaking}
                      colorScheme="red"
                    >
                      {isUnstaking ? "Unstaking your NFTs..." : "Unstake"}
                    </Button>
                  </Stack>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsUnStakeModalOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      )}
    </Box>
  );
}
