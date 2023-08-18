"use client";
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  VStack,
  useClipboard,
  Popover,
  PopoverTrigger,
  PopoverContent,
  HStack,
  useToast,
  useUpdateEffect,
} from "@chakra-ui/react";
import Progress from "./Progress";
import TaskTable from "./TaskTable";
import { CopyIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";
import LeaderBoard from "./LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import { CicularLoading } from "./CircularLoading";
import loadTaskList from "src/state/airdrop/thunks/getTaskList";
import claimTask from "src/state/airdrop/thunks/claimTask";
import { useRouter } from "next/router";
import updateRef from "src/state/airdrop/thunks/updateRef";
import { getNftContract } from 'src/utils/hooks';
import { usePublicClient, useWalletClient, useAccount } from 'wagmi';
import { waitForTransaction } from '@wagmi/core'
import { ethers } from "ethers";
import loadLeaderboard from "src/state/airdrop/thunks/getLeaderboard";
const MINT_FEE = '0.0015';

const AirdropPage = () => {
  const router = useRouter();
  const { ref } = router.query;
  const [loading, setLoading] = useState(false)
  const [mintError, setMintError] = useState(false)

  const dispatch = useDispatch();
  const {address} = useAccount();
  const { overview, isLoading } = useSelector((state) => state.airdrop);
  
  const addressMemo = useMemo(() => address, [address]);
  const FE_DOMAIN = process.env.NEXT_PUBLIC_FE_DOMAIN;
  //for copy
  const { onCopy, setValue: setCopyValue } = useClipboard("");
  const toast = useToast();
  const { data: walletClient } = useWalletClient()
  const { data: publicClient } = usePublicClient()
  const nftContract = useMemo(() => getNftContract(walletClient, publicClient), [walletClient, publicClient]) 

  const showMintError = () => {
    toast({
      title: "Insufficient funds !",
      status: "error",
      duration: 1000,
    });
    setMintError("")
  };

  useUpdateEffect(() => {
    mintError && showMintError();
  }, [mintError]);

  useEffect(() => {}, [overview, isLoading]);

  const copyRefLink = () => {
    onCopy();
    toast({
      title: "Link is Copied",
      status: "success",
      duration: 1000,
    });
  };

  //end copy

  const handleFetchTask = () => {
    address !== "" && dispatch(loadTaskList(address));
  };

  const handleMintNFT = async () => {
    setLoading(true)
    try {
      const tx = await nftContract?.write?.mint([], {
        value: ethers.utils.parseEther(MINT_FEE),
      });
      await waitForTransaction(
        { hash: tx }
      )
      setTimeout(() => handleFetchTask(), 4000);

    } catch (error) {
      setMintError(error.message)
    }
    setLoading(false)
  };

  const handleFetchLeaderBoard = () => {
    dispatch(loadLeaderboard());
  };

  const handleClaim = (data) => {
    dispatch(
      claimTask({
        data,
        handleFetchTask,
        handleFetchLeaderBoard,
      })
    );
  };

  useEffect(() => {
    setCopyValue(`${FE_DOMAIN}/airdrop?ref=${address}`);

    if (ref !== undefined && address && address !== "") {
      dispatch(
        updateRef({
          address,
          referralBy: ref,
        })
      );
    }
    handleFetchTask();
    handleFetchLeaderBoard();
  }, [address, ref]);

  useUpdateEffect(() => {
    if (typeof address === "string" && address.trim().length > 0) {
      router.reload();
    }
  }, [address]);

  return (
    <Box
      width={"full"}
      bgGradient="linear(180deg, #3146C6 0%, #18215D 90%)"
      minH={{
        base: "auto",
        md: "calc(100vh - 170px)",
      }}
      pt={"30px"}
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
        <Container
          // bgGradient="linear(180deg, #3146C6 0%, #18215D 100%)"
          maxW={1400}
          mx="auto"
          paddingX={{ base: 2, md: 90 }}
          pb={4}
        >
          <>
            {isLoading || loading && <CicularLoading />}
            <>
              <Text
                fontSize={{ base: "2xl", md: "5xl" }}
                textAlign="center"
                color={"#5EEDFF"}
              >
                PIRA SEASON 1
              </Text>

              <Progress />

              <Text
                fontSize={{ base: "1xl", md: "3xl" }}
                textAlign="center"
                color="white"
                my={6}
              >
                All transaction fees will be used for buyback when the token is
                listed on CEX
              </Text>

              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                width={{ base: "full", lg: "95%" }}
                marginX="auto"
                spacing={10}
                paddingX={{ base: 6, md: 0 }}
              >
                <Box
                  rounded="lg"
                  borderWidth={2}
                  borderColor={"cyan.400"}
                  color="white"
                  bg="blue.900"
                  role="group"
                >
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    h="100%"
                  >
                    <HStack>
                      <Text fontSize={{ base: "1xl", md: "3xl" }}>
                        Earning Token
                      </Text>
                      <Popover trigger="hover">
                        <PopoverTrigger>
                          <InfoOutlineIcon color={"#00F0FF"} />
                        </PopoverTrigger>
                        <PopoverContent
                          width={"194px"}
                          height={"60px"}
                          border="none"
                        >
                          <Box
                            rounded="lg"
                            borderWidth={1}
                            borderColor={"cyan.400"}
                            color="white"
                            bg="blue.600"
                            role="group"
                          >
                            <Text
                              color={"white"}
                              padding={"5px"}
                              textAlign={"center"}
                            >
                              Number of points you earn through completing task
                            </Text>
                          </Box>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                    <Text fontSize={{ base: "2xl", md: "4xl" }} my={4}>
                      {overview?.earningTokens}
                    </Text>
                  </Flex>
                </Box>
                <Box
                  rounded="lg"
                  borderWidth={2}
                  borderColor={"cyan.400"}
                  color="white"
                  bg="blue.900"
                  role="group"
                  justifyContent={"center"}
                >
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    h="100%"
                  >
                    <HStack>
                      <Text fontSize={{ base: "1xl", md: "3xl" }}>
                        Referral Token
                      </Text>
                      <Popover trigger="hover">
                        <PopoverTrigger>
                          <InfoOutlineIcon color={"#00F0FF"} />
                        </PopoverTrigger>
                        <PopoverContent
                          width={"194px"}
                          height={"60px"}
                          border="none"
                        >
                          <Box
                            rounded="lg"
                            borderWidth={1}
                            borderColor={"cyan.400"}
                            color="white"
                            bg="blue.600"
                            role="group"
                          >
                            <Text
                              color={"white"}
                              padding={"5px"}
                              textAlign={"center"}
                            >
                              Number of points you earn inviting friends
                            </Text>
                          </Box>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                    <Text fontSize={{ base: "2xl", md: "4xl" }} my={4}>
                      {overview?.referralTokens}
                    </Text>
                  </Flex>
                </Box>
                <Box
                  rounded="lg"
                  borderWidth={2}
                  borderColor={"cyan.400"}
                  color="white"
                  bg="blue.900"
                  role="group"
                >
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    h="100%"
                  >
                    <HStack>
                      <Text fontSize={{ base: "1xl", md: "3xl" }}>BOOST</Text>
                      <Popover trigger="hover">
                        <PopoverTrigger>
                          <InfoOutlineIcon color={"#00F0FF"} />
                        </PopoverTrigger>
                        <PopoverContent
                          width={"200px"}
                          height={"54px"}
                          border="none"
                        >
                          <Box
                            rounded="lg"
                            borderWidth={1}
                            borderColor={"cyan.400"}
                            color="white"
                            bg="blue.600"
                            role="group"
                          >
                            <Text
                              color={"white"}
                              padding={"5px"}
                              textAlign={"center"}
                            >
                              Inviting 2 people will boost you 1.5x, inviting 5
                              people will boost you 2x
                            </Text>
                          </Box>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                    <Text fontSize={{ base: "2xl", md: "4xl" }} my={4}>
                      {overview?.boost}x
                    </Text>
                  </Flex>
                </Box>
              </SimpleGrid>

              <VStack spacing="24px" mt={14}>
                <Flex justify="center">
                  <Text
                    rounded="lg"
                    borderWidth={2}
                    borderColor="cyan.400"
                    fontSize={{ base: "1xl", md: "2xl" }}
                    px={24}
                    py={2}
                    bg="white"
                  >
                    Pira Season 1 detail
                  </Text>
                </Flex>

                <Flex width={"full"} flexWrap="nowrap">
                  <Text
                    fontSize={{ base: "1xl", md: "2xl" }}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    textOverflow="ellipsis"
                    maxWidth={600}
                    textAlign="start"
                    color="white"
                  >
                    Referral link: {`${FE_DOMAIN}/airdrop?ref=${address}`}
                  </Text>
                  <CopyIcon
                    onClick={copyRefLink}
                    fontSize="2xl"
                    color="white"
                    cursor="pointer"
                    mx="2px"
                  />
                </Flex>

                <Flex width="full">
                  <Text
                    fontSize={{ base: "1xl", md: "3xl" }}
                    borderBottomWidth={2}
                    borderColor={"cyan.400"}
                    color="white"
                  >
                    How to get PIRA?
                  </Text>
                </Flex>
                <TaskTable
                  copyRefLink={copyRefLink}
                  handleMintNFT={handleMintNFT}
                  handleClaim={handleClaim}
                />
                <LeaderBoard />
              </VStack>
            </>
          </>
        </Container>
      )}
    </Box>
  );
};

export default AirdropPage;
