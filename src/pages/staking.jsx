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
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNftBalance } from "src/utils/helper";
import { BigNumber, ethers } from "ethers";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";
// state
import {
  approveAllTokens,
  harvestRewards,
  fetchTotalRewards,
  getNFTBalance,
} from "src/state/stake/slice";
import { stakeNft } from "src/state/stake/thunks/stakeNft";
import { unstake } from "src/state/stake/thunks/unstake";
//
const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export default function Staking() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [balanceNFT, setBalanceNFT] = useState(0);
  const [amount, setAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const { account, selectedChain } = useSelector((state) => state.chain);
  const address = useSelector((state) => state.chain.account);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnStakeModalOpen, setIsUnStakeModalOpen] = useState(false);
  const [buttonStatuses, setButtonStatuses] = useState([]);
  const [isHarvestingRewards, setIsHarvestingRewards] = useState(false);
  // state
  const { totalRewards, totalNftStacked } = useSelector((state) => state.stake);
  const harvestingRewards = useSelector(
    (state) => state.stake.harvestingRewards
  );
  const stakingNft = useSelector((state) => state.stake.stakingNft);
  const unstakingNft = useSelector((state) => state.stake.unstaking);
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

  const handleLoadBalance = useCallback(
    async (token) => {
      let result = BigNumber.from(0);
      if (address && selectedChain) {
        result = await loadNftBalance(address, selectedChain, token);
      }
      const nftBalance = result.toString();
      setBalanceNFT(nftBalance);
      return result;
    },
    [address, selectedChain]
  );
  // load balance NFT
  useEffect(() => {
    handleLoadBalance(BaseConfig.nft);
  }, []);

  const handleApproveAllTokens = async () => {
    dispatch(approveAllTokens(address));
  };
  // stake
  const handleSubmitStake = async (e) => {
    e.preventDefault();
    try {
      await handleApproveAllTokens();
      const response = await dispatch(stakeNft({ amount }));
      // close the modal
      setIsStakeModalOpen(false);
      setAmount(0);
      dispatch(getNFTBalance());
      toast({
        title: "Success!",
        description: "Your NFTs have been staked successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while staking NFTs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  // get total reward
  useEffect(() => {
    dispatch(fetchTotalRewards());
  }, [address, dispatch]);
  useEffect(() => {
    dispatch(getNFTBalance());
  }, [address, dispatch]);
  // havest rewards
  const handleHarvestRewards = async () => {
    setIsHarvestingRewards(true);
    try {
      const response = await dispatch(harvestRewards());
      // close the modal
      toast({
        title: "Success!",
        description: "Havest successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while havest.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsHarvestingRewards(false);
    }
  };
  // unstake
  const handleSubmitUnStake = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(unstake({ unstakeAmount }));
      // close the modal
      setIsUnStakeModalOpen(false);
      setUnstakeAmount(0);
      dispatch(getNFTBalance());
      toast({
        title: "Success!",
        description: "Your NFTs have been unstake successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while unstaking NFTs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 90%)"
      width={"full"}
      minH={{
        base: "calc(100vh - 150px)",
        md: "calc(100vh - 170px)",
      }}
    >
      {address === "" ? (
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
                    {balanceNFT}
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
                        isLoading={isHarvestingRewards}
                        isDisabled={isHarvestingRewards}
                        padding={"0px 40px"}
                        css={{
                          ":hover": {
                            color: "green",
                            // background: "#cacfd5",
                          },
                        }}
                      >
                        {isHarvestingRewards
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
                          <Button
                            justifyContent="center"
                            size="lg"
                            variant="outline"
                            aria-label="Options token out"
                            onClick={() => setIsStakeModalOpen(true)}
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
                      <Text fontSize="lg">Your Balance NFT: {balanceNFT}</Text>
                    </Box>
                    <Button
                      type="submit"
                      isLoading={stakingNft}
                      isDisabled={stakingNft}
                      colorScheme="green"
                    >
                      {stakingNft ? "Staking your NFTs..." : "Stake"}
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
                        Your Staked NFT: {totalNftStacked}
                      </Text>
                    </Box>
                    <Button
                      type="submit"
                      isLoading={unstakingNft}
                      isDisabled={unstakingNft}
                      colorScheme="red"
                    >
                      {unstakingNft ? "Unstaking your NFTs..." : "Unstake"}
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
