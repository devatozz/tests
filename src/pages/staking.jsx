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
import { stake } from "src/state/stake/thunks/stakeNft";
import { unstake } from "src/state/stake/thunks/unstake";
//
const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export default function Staking() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [balanceNFT, setBalanceNFT] = useState(0);
  const [amount, setAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const { account, selectedChain } = useSelector((state) => state.chain);
  const address = useSelector((state) => state.chain.account);

  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnStakeModalOpen, setIsUnStakeModalOpen] = useState(false);
  const { totalRewards, totalNftStacked } = useSelector((state) => state.stake);
  const harvestingRewards = useSelector(
    (state) => state.stake.harvestingRewards
  );
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

  const handleLoadBalance = useCallback(
    async (token) => {
      setIsLoading(true);
      let result = BigNumber.from(0);
      if (account && selectedChain) {
        result = await loadNftBalance(account, selectedChain, token);
      }
      setIsLoading(false);
      const nftBalance = result.toString();
      setBalanceNFT(nftBalance);
      return result;
    },
    [account, selectedChain]
  );
  // load balance NFT
  useEffect(() => {
    handleLoadBalance(BaseConfig.nft);
  }, []);

  const handleApproveAllTokens = async () => {
    dispatch(approveAllTokens(account));
  };

  const handleSubmitStake = async (e) => {
    e.preventDefault();
    try {
      handleApproveAllTokens();
      const response = await dispatch(stake({ amount }));
    } catch (error) {
      console.error(error);
    }
  };
  // get total reward
  useEffect(() => {
    dispatch(fetchTotalRewards());
  }, [account, dispatch]);
  useEffect(() => {
    dispatch(getNFTBalance());
  }, [account, dispatch]);
  // havest rewards
  const handleHarvestRewards = () => {
    dispatch(harvestRewards());
  };
  // unstake
  const handleSubmitUnStake = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(unstake({ unstakeAmount }));
    } catch (error) {
      console.error(error);
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
                  Balance NFT:
                  <Box as="span" color="#39ACFF" margin={"0px 20px"}>
                    {balanceNFT}
                  </Box>
                </Text>
              </Box>
              <Box
                border="2px solid #D4FFF2 "
                textAlign="center"
                padding="15px "
                borderRadius="10px"
                marginTop="8"
              >
                <Text fontSize="32px" color="#fff">
                  Total rewards:
                  <Box as="span" color="#39ACFF" margin={"0px 20px"}>
                    {Number(totalRewards).toFixed(2)}
                  </Box>
                </Text>
              </Box>
              <Box
                border="2px solid #D4FFF2 "
                textAlign="center"
                padding="15px "
                borderRadius="10px"
                marginTop="8"
              >
                <Text fontSize="32px" color="#fff">
                  <button
                    onClick={handleHarvestRewards}
                    disabled={harvestingRewards}
                  >
                    {harvestingRewards
                      ? "Harvesting rewards..."
                      : "Harvest rewards"}
                  </button>
                </Text>
              </Box>
              <Box
                border="2px solid #D4FFF2 "
                textAlign="center"
                padding="15px "
                borderRadius="10px"
                marginTop="8"
              >
                <Text fontSize="32px" color="#fff">
                  <button
                    onClick={() => setIsUnStakeModalOpen(true)}
                    disabled={harvestingRewards}
                  >
                    Unstake
                  </button>
                </Text>
              </Box>
            </Stack>
          </SimpleGrid>
          <Container maxW={"5xl"} py={12}>
            <Center marginTop={24}>
              <Text
                color={"#fff"}
                fontSize={"48px"}
                border="3px solid #D4FFF2"
                padding={8}
                width={"full"}
                textAlign={"Center"}
              >
                Total NFTs Staked: {totalNftStacked}
              </Text>
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
                    <Text fontSize="42px" color="#1F2B7A">
                      {el.pool} Pira NFTs
                    </Text>
                    <Box
                      padding="8px 16px"
                      backgroundColor="#1E2A76"
                      textAlign="center"
                      borderRadius="10px"
                    >
                      <Text color="#00FF85" padding="0px" fontSize="36px">
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
                      {el.need <= 0 ? (
                        <>
                          <Button
                            justifyContent="center"
                            size="lg"
                            variant="outline"
                            aria-label="Options token out"
                            onClick={() => setIsStakeModalOpen(true)}
                            isDisabled="true"
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
                            <Text>Stake</Text>
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
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Stake Your NFT</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmitStake}>
                  <label>Amount:</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <br />
                  <Button
                    type="submit"
                    css={{
                      background: "#1E2A76",
                      border: "none",
                      textAlign: "center",
                      margin: "20px 0px",
                      color: "#D4FFF2",
                      ":hover": {
                        background: "#2e3ea5",
                      },
                    }}
                    marginTop={4}
                  >
                    Stake
                  </Button>
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
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Un Stake Your NFT</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmitUnStake}>
                  <label>
                    Amount:
                    <Input
                      type="number"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                    />
                  </label>
                  <br />
                  <Button
                    type="submit"
                    css={{
                      background: "#1E2A76",
                      border: "none",
                      textAlign: "center",
                      margin: "20px 0px",
                      color: "#D4FFF2",
                      ":hover": {
                        background: "#2e3ea5",
                      },
                    }}
                    marginTop={4}
                  >
                    Unstake
                  </Button>
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
