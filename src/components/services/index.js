import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Container,
  Image,
  Heading,
  useMediaQuery,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import { ScrollToTopButton } from "../home/Banner";
import NextLink from "next/link";

const ITEM_SERVICE = [
  {
    items: [
      "Decentralized Exchange",
      "Non-custodial Wallet",
      "DEX Aggregator",
      "GameFi Products",
      "Permissionless Launchpad",
      "NFT Collection",
      "NFT Marketplace",
      "Decentralized Perpetual Exchange ",
      "Algorithmic Stablecoin",
      "Lending Protocol",
      "Liquid Staking Products",
      "Social Mining",
      "Memes",
      "Concentrated Liquidity Market Maker",
      "BRC20",
      "DAO",
    ],
  },
  {
    items: [
      "Faucet",
      "Block Explorer",
      "Bridge",
      "Node Validator",
      "API",
      "RPC Endpoints",
      "Staking Interface",
    ],
  },
  {
    items: [
      "Layer 1",
      "Layer 2",
      "Contract Audit",
      "Real World Assets",
      "Metaverse",
      "Decentralized Identity",
    ],
  },
  {
    items: [
      "Social Media",
      "IDO/Launchpad",
      "Content Schedule",
      "KOL/Caller",
      "Paid Marketing",
      "Video Production",
      "Branding",
      "Airdrop Strategy",
      "Product Design",
      "UX Writing",
      "Mobile App Design",
      "Press Release",
    ],
  },
];

const index = () => {
  return (
    <Box m={0} w={{ xl: '"100%"' }} mx='auto' p={0} mb={'300px'} bg={"#000"}>
      <Flex
        alignItems={"center"}
        position={"relative"}
        p={{ base: "40px 0", md: "0px 0" }}
        justifyContent={"center"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
      >
        <Container maxW={{ base: "90%", '2xl': '100%' }} p={0}>
          <Box py={{ md: 12, lg: 16 }}>
            <Box align={"center"}>
              <Heading
                fontWeight={400}
                fontSize={{
                  base: "22px",
                  md: "28px",
                  xl: "36px",
                  "2xl": "80px",
                }}
                lineHeight={{
                  base: "28px",
                  md: "36px",
                  xl: "50px",
                  "2xl": "70px",
                }}
                color={"#fff"}
                textAlign={{ md: "left", base: "left" }}
              >
                BLOCKCHAIN & MARKETING
                <span style={{ color: "#0068FF" }}> SERVICES </span>
              </Heading>
            </Box>
            <Box border={"1px solid gray"} margin={"64px 0px"}></Box>
            {/* tab selected */}
            <Box>
              <Tabs
                color={"gray"}
                variant="unstyled"
                fontSize={{ md: "22px", base: "18px" }}
                textAlign={"left"}
                p={0}
              >
                {" "}
                <TabList>
                  <SimpleGrid
                    columns={{ base: 1, md: 4 }}
                    spacing={{ lg: '64px', base: 0 }}
                    display={{ md: 'flex' }}
                  >
                    <Tab

                      fontSize={{ base: "20px", md: "20px", xl: "28px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      DEFI & WEB3 PRODUCTS
                    </Tab>
                    <Tab
                      fontSize={{ base: "20px", md: "20px", xl: "28px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      INFRASTRUCTURES
                    </Tab>
                    <Tab
                      fontSize={{ base: "20px", md: "20px", xl: "28px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      ENTERPRISE PRODUCTS
                    </Tab>
                    <Tab
                      fontSize={{ base: "20px", md: "20px", xl: "28px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      MARKETING SERVICES
                    </Tab>
                  </SimpleGrid>
                </TabList>

                <TabPanels marginTop={"70px"}>
                  <TabPanel p={0}>
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      flexWrap={"wrap"}
                      flexDirection={"row"}
                      gap={'22px'}
                    >
                      {ITEM_SERVICE[0].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "10px 40px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "13px", md: "24px" }}
                          height={{ base: "30px", md: "56px" }}
                        >
                          <Text color={"#fff"}>{tab}</Text>
                        </Box>
                      ))}
                    </Box>
                  </TabPanel>

                  <TabPanel>
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      flexWrap={"wrap"}
                      flexDirection={"row"}
                      gap={'24px'}
                    >
                      {ITEM_SERVICE[1].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "10px 40px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "13px", md: "24px" }}
                          height={{ base: "30px", md: "56px" }}
                        >
                          <Text color={"#fff"}>{tab}</Text>
                        </Box>
                      ))}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      flexWrap={"wrap"}
                      flexDirection={"row"}
                      gap={'24px'}
                    >
                      {ITEM_SERVICE[2].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "10px 40px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "13px", md: "24px" }}
                          height={{ base: "30px", md: "56px" }}
                        >
                          <Text color={"#fff"}>{tab}</Text>
                        </Box>
                      ))}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      flexWrap={"wrap"}
                      flexDirection={"row"}
                      gap={'24px'}
                    >
                      {ITEM_SERVICE[3].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "10px 40px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "13px", md: "24px" }}
                          height={{ base: "30px", md: "56px" }}
                        >
                          <Text color={"#fff"}>{tab}</Text>
                        </Box>
                      ))}
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Container>
      </Flex>
      <ScrollToTopButton />
    </Box >
  );
};

export default index;
