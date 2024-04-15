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

const ITEM_CAREER = [
  {
    items: [],
  },
  {
    items: [],
  },
  {
    items: [],
  },
  {
    items: [],
  },
  {
    items: [],
  },
  {
    items: [],
  },
];

const index = () => {
  return (
    <Box m={0} w={"100%"} p={0} minHeight="calc(100vh - 72px)" bg={"#000"}>
      <Flex
        alignItems={"center"}
        position={"relative"}
        p={{ base: "40px 0", md: "0px 0" }}
        justifyContent={"center"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
      >
        <Container maxW={"90%"}>
          <Box py={{ md: 12, lg: 16 }}>
            <Box align={"center"}>
              <Heading
                fontWeight={400}
                fontSize={{
                  base: "22px",
                  md: "28px",
                  xl: "36px",
                  "2xl": "56px",
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
                JOIN THE
                <span style={{ color: "#0068FF" }}> M33M </span>
                FORCE TODAY
              </Heading>
            </Box>
            <Box border={"1px solid gray"} margin={"30px 0px"}></Box>
            {/* tab selected */}
            <Box>
              <Tabs
                color={"gray"}
                variant="unstyled"
                fontSize={{ md: "22px", base: "18px" }}
                textAlign={"left"}
              >
                {" "}
                <TabList>
                  <SimpleGrid
                    columns={{ base: 1, md: 6 }}
                    spacing={{ md: 4, base: 0 }}
                  >
                    <Tab
                      fontSize={{ base: "16px", md: "18px", xl: "22px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      ENGINEERING
                    </Tab>
                    <Tab
                      fontSize={{ base: "16px", md: "18px", xl: "22px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      CREATIVE
                    </Tab>
                    <Tab
                      fontSize={{ base: "16px", md: "18px", xl: "22px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      GROWTH
                    </Tab>
                    <Tab
                      fontSize={{ base: "16px", md: "18px", xl: "22px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      LEGAL
                    </Tab>
                    <Tab
                      fontSize={{ base: "16px", md: "18px", xl: "22px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      HUMAN
                    </Tab>
                    <Tab
                      fontSize={{ base: "16px", md: "18px", xl: "22px" }}
                      _selected={{ color: "white" }}
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                    >
                      BUSINESS
                    </Tab>
                  </SimpleGrid>
                </TabList>
                <TabPanels marginTop={"20px"}>
                  <TabPanel>
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      flexWrap={"wrap"}
                      flexDirection={"row"}
                      gap={5}
                    >
                      {ITEM_CAREER[0].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "5px 20px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
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
                      gap={5}
                    >
                      {ITEM_CAREER[1].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "5px 20px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
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
                      gap={5}
                    >
                      {ITEM_CAREER[2].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "5px 20px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
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
                      gap={5}
                    >
                      {ITEM_CAREER[3].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "5px 20px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
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
                      gap={5}
                    >
                      {ITEM_CAREER[4].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "5px 20px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
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
                      gap={5}
                    >
                      {ITEM_CAREER[5].items.map((tab, index) => (
                        <Box
                          borderRadius={"0px"}
                          border="1px solid #fff"
                          width={"fit-content"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          style={{
                            padding: "5px 20px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
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
    </Box>
  );
};

export default index;
