import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Container,
  Image,
  Heading,
} from "@chakra-ui/react";
import { ScrollToTopButton } from "../home/Banner";
import NextLink from "next/link";
let mono =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/mono.svg?alt=media&token=52504040-0644-4340-93be-f8fba38501c6";
let musd =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/musd.svg?alt=media&token=3af5de67-5d36-4765-8244-631293e96ece";
let hype =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/hype.svg?alt=media&token=fdd5dea8-a0c4-4efe-aa36-3294d59a2ce1";
let monoIcon =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/monoIcon.svg?alt=media&token=baffb59d-fcde-4e14-87a5-3e275e796f13";
let musdIcon =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/msdIcon.svg?alt=media&token=d324c92b-bb16-4f34-897f-d02ee4a6ae22";
let hypeIcon =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/hypeIcon.svg?alt=media&token=228fb37b-3acb-4ddb-b4a2-4b916772f935";

const index = () => {
  const [hoverMonoswap, setHoverMonoSwap] = useState(null);
  const [hoverMusd, setHoverMusd] = useState(null);
  const [hoverHype, setHoverHype] = useState(null);

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
                PROJECTS WE BUILT
                <span style={{ color: "#0068FF" }}> TOGETHER </span>
              </Heading>
            </Box>
            <Box border={"1px solid gray"} margin={"30px 0px"}></Box>
            {/* Monoswap*/}
            <Box>
              <Box
                width={"100%"}
                height={"fit-content"}
                border={"1px solid gray"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                overflow={"hidden"}
                onMouseEnter={() => setHoverMonoSwap("none")}
                onMouseLeave={() => setHoverMonoSwap(null)}
              >
                <Box
                  width={{ base: "100%", md: "50%" }}
                  height={"100%"}
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    flexDirection={"column"}
                    padding={{ md: "5px 20px", base: "30px" }}
                    gap={"10px"}
                  >
                    {" "}
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      gap={"20px"}
                    >
                      <Box>
                        <Image
                          src={monoIcon}
                          alt="Icons"
                          height={"40px"}
                          width={"40px"}
                          filter={
                            hoverMonoswap ? hoverMonoswap : "grayscale(1)"
                          }
                        />
                      </Box>
                      <Box>
                        <Text
                          color={"#fff"}
                          fontSize={{ base: "16px", md: "26px" }}
                          fontWeight={{ base: "300", md: "400" }}
                          lineHeight={{ base: "19px", md: "26px" }}
                          fontFamily="Anta"
                          fontStyle={"normal"}
                        >
                          MONOSWAP
                        </Text>
                      </Box>
                    </Box>
                    <Box align={"center"} textAlign={"left"} marginTop={"10px"}>
                      <Text
                        color={"#fff"}
                        fontSize={{ base: "15px", xl: "20px", "2xl": "24px" }}
                        width={"90%"}
                        lineHeight={{
                          base: "20pxpx",
                          xl: "28px",
                          "2xl": "32px",
                        }}
                        fontFamily="Anta"
                        textAlign={{ md: "left", base: "left" }}
                        fontWeight={{ base: 400, md: 400 }}
                      >
                        MonoSwap is a gamified Decentralized Exchange built on
                        the Blast network. It leverages the native yield for
                        on-chain assets via an XP system that allows traders,
                        liquidity providers, and community members to earn 5
                        different yield sources.
                      </Text>
                    </Box>
                    <Box width={{ base: "100%", md: "40%" }} marginTop={"20px"}>
                      <NextLink
                        href={"https://www.monoswap.io/"}
                        target="_blank"
                      >
                        <Button
                          backgroundColor={"#fff"}
                          transition="background-color 0.3s ease-in-out"
                          borderRadius={"0px"}
                          border="1px solid transparent"
                          width={"100%"}
                          _hover={{
                            bg: "transparent",
                            color: "#fff",
                            border: "1px solid #fff",
                          }}
                          style={{
                            padding: "5px 32px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
                          height={{ base: "30px", md: "56px" }}
                          color={"#000"}
                        >
                          Launch App
                        </Button>
                      </NextLink>
                    </Box>
                  </Box>
                </Box>
                <Box width={{ base: "0%", md: "50%" }}>
                  <Image
                    src={mono}
                    alt="avatar"
                    height={"100%"}
                    width={"100%"}
                    filter={hoverMonoswap ? hoverMonoswap : "grayscale(1)"}
                  />
                  <Box />
                </Box>
              </Box>
            </Box>

            <Box marginTop={"30px"}>
              <Box
                width={"100%"}
                height={"fit-content"}
                border={"1px solid gray"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                overflow={"hidden"}
                onMouseEnter={() => setHoverMusd("none")}
                onMouseLeave={() => setHoverMusd(null)}
              >
                <Box width={{ base: "0%", md: "50%" }}>
                  <Image
                    src={musd}
                    alt="icons"
                    height={"100%"}
                    filter={hoverMusd ? hoverMusd : "grayscale(1)"}
                  />
                  <Box />
                </Box>
                <Box
                  width={{ base: "100%", md: "50%" }}
                  height={"100%"}
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    flexDirection={"column"}
                    padding={{ md: "5px 20px", base: "30px" }}
                    gap={"10px"}
                  >
                    {" "}
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      gap={"20px"}
                    >
                      <Box>
                        <Image
                          src={musdIcon}
                          alt="Icons"
                          height={"40px"}
                          width={"40px"}
                          filter={hoverMusd ? hoverMusd : "grayscale(1)"}
                        />
                      </Box>
                      <Box>
                        <Text
                          color={"#fff"}
                          fontSize={{ base: "16px", md: "26px" }}
                          fontWeight={{ base: "300", md: "400" }}
                          lineHeight={{ base: "19px", md: "26px" }}
                          fontFamily="Anta"
                          fontStyle={"normal"}
                        >
                          MUSD
                        </Text>
                      </Box>
                    </Box>
                    <Box align={"center"} textAlign={"left"} marginTop={"10px"}>
                      <Text
                        color={"#fff"}
                        fontSize={{ base: "15px", xl: "20px", "2xl": "24px" }}
                        width={"90%"}
                        lineHeight={{
                          base: "20pxpx",
                          xl: "28px",
                          "2xl": "32px",
                        }}
                        fontFamily="Anta"
                        textAlign={{ md: "left", base: "left" }}
                        fontWeight={{ base: 400, md: 400 }}
                      >
                        MUSD is an over-collateralized special token whose price
                        will never go down. The token is fully backed by Blast's
                        USDB and can't be depeg due to its unique mint/redeem
                        mechanism. Can be considered one of the best safe havens
                        that ever existed.
                      </Text>
                    </Box>
                    <Box width={{ base: "100%", md: "40%" }} marginTop={"20px"}>
                      <NextLink
                        href={"https://www.monoswap.io/#/musd"}
                        target="_blank"
                      >
                        <Button
                          backgroundColor={"#fff"}
                          transition="background-color 0.3s ease-in-out"
                          borderRadius={"0px"}
                          border="1px solid transparent"
                          width={"100%"}
                          _hover={{
                            bg: "transparent",
                            color: "#fff",
                            border: "1px solid #fff",
                          }}
                          style={{
                            padding: "5px 32px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
                          height={{ base: "30px", md: "56px" }}
                          color={"#000"}
                        >
                          Launch App
                        </Button>
                      </NextLink>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box marginTop={"30px"}>
              <Box
                width={"100%"}
                height={"fit-content"}
                border={"1px solid gray"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                overflow={"hidden"}
                onMouseEnter={() => setHoverHype("none")}
                onMouseLeave={() => setHoverHype(null)}
              >
                <Box
                  width={{ base: "100%", md: "50%" }}
                  height={"100%"}
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    flexDirection={"column"}
                    padding={{ md: "5px 20px", base: "30px" }}
                    gap={"10px"}
                  >
                    {" "}
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      gap={"20px"}
                    >
                      <Box>
                        <Image
                          src={hypeIcon}
                          alt="Icons"
                          height={"40px"}
                          width={"40px"}
                          filter={hoverHype ? hoverHype : "grayscale(1)"}
                        />
                      </Box>
                      <Box>
                        <Text
                          color={"#fff"}
                          fontSize={{ base: "16px", md: "26px" }}
                          fontWeight={{ base: "300", md: "400" }}
                          lineHeight={{ base: "19px", md: "26px" }}
                          fontFamily="Anta"
                          fontStyle={"normal"}
                        >
                          HYPE
                        </Text>
                      </Box>
                    </Box>
                    <Box align={"center"} textAlign={"left"} marginTop={"10px"}>
                      <Text
                        color={"#fff"}
                        fontSize={{ base: "15px", xl: "20px", "2xl": "24px" }}
                        width={"90%"}
                        lineHeight={{
                          base: "20pxpx",
                          xl: "28px",
                          "2xl": "32px",
                        }}
                        fontFamily="Anta"
                        textAlign={{ md: "left", base: "left" }}
                        fontWeight={{ base: 400, md: 400 }}
                      >
                        MonoSwap is a gamified Decentralized Exchange built on
                        the Blast network. It leverages the native yield for
                        on-chain assets via an XP system that allows traders,
                        liquidity providers, and community members to earn 5
                        different yield sources.
                      </Text>
                    </Box>
                    <Box width={{ base: "100%", md: "40%" }} marginTop={"20px"}>
                      <NextLink
                        href={"https://www.monoswap.io/#/xp"}
                        target="_blank"
                      >
                        <Button
                          backgroundColor={"#fff"}
                          transition="background-color 0.3s ease-in-out"
                          borderRadius={"0px"}
                          border="1px solid transparent"
                          width={"100%"}
                          _hover={{
                            bg: "transparent",
                            color: "#fff",
                            border: "1px solid #fff",
                          }}
                          style={{
                            padding: "5px 32px",
                            fontFamily: "Anta",
                            fontWeight: "400",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
                          height={{ base: "30px", md: "56px" }}
                          color={"#000"}
                        >
                          Launch App
                        </Button>
                      </NextLink>
                    </Box>
                  </Box>
                </Box>
                <Box width={{ base: "0%", md: "50%" }}>
                  <Image
                    src={hype}
                    alt="avatar"
                    height={"100%"}
                    filter={hoverHype ? hoverHype : "grayscale(1)"}
                  />
                  <Box />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Flex>
      <ScrollToTopButton />
    </Box>
  );
};

export default index;
