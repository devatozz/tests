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
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNftBalance } from "src/utils/helper";
import { BigNumber, ethers } from "ethers";
import TestNetAddress from "src/state/config/base-testnet.json";
export default function Staking() {
  const { account, selectedChain } = useSelector((state) => state.chain);
  const [isLoading, setIsLoading] = useState(false);
  const [balanceNFT, setBalanceNFT] = useState(0);
  const poolsInfor = [
    {
      pool: 10,
      balance: balanceNFT,
      apr: "100%",
      need: 10 - balanceNFT,
    },
    {
      pool: 30,
      balance: balanceNFT,
      apr: "200%",
      need: 30 - balanceNFT,
    },
    {
      pool: 60,
      balance: balanceNFT,
      apr: "300%",
      need: 60 - balanceNFT,
    },
    {
      pool: 100,
      balance: balanceNFT,
      apr: "500%",
      need: 100 - balanceNFT,
    },
    {
      pool: 150,
      balance: balanceNFT,
      apr: "800%",
      need: 150 - balanceNFT,
    },
  ];
  // load balance NFT
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
  useEffect(() => {
    handleLoadBalance(TestNetAddress.nft);
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
            <Stack spacing={6} borderBottom="1px dashed #fff" paddingBottom={9}>
              <Text color={"#fff"} fontSize={"42px"}>
                Pira NFT Staking
              </Text>
              <Text color={"#D0D0D0"} fontSize={"18px"}>
                Introducing Pira NFT Staking from Pira Finance. The Pira Fam now
                has the chance to increase the $PIRA earned by staking your Pira
                NFT with an attractive APR! You must own enough NFTs for each
                pool to be eligible for staking and earn $PIRA. <br /> <br />
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
                Balance NFT:{" "}
                <Box as="span" color="#39ACFF">
                  {balanceNFT}
                </Box>
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
              Total NFTs Staked: 000
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
                    Balance: {el.balance}/{el.pool}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" marginTop={6} gap={16}>
                  <Box
                    padding="8px 16px"
                    backgroundColor="#1E2A76"
                    textAlign="center"
                    borderRadius="10px"
                    flex={"3"}
                  >
                    {el.need < 0 ? (
                      <Text color="#D4FFF2" padding="0px" fontSize="28px">
                        Stake
                      </Text>
                    ) : (
                      <Text color="#D4FFF2" padding="0px" fontSize="28px">
                        Need More {el.need} to Stake
                      </Text>
                    )}
                  </Box>
                  <Box
                    padding="8px 16px"
                    backgroundColor="#1E2A76"
                    textAlign="center"
                    borderRadius="10px"
                    flex={"1"}
                  >
                    <Text color="#D4FFF2" padding="0px" fontSize="28px">
                      Harvest
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Center>
          ))}
        </Container>
        ;
      </Container>
    </Box>
  );
}
