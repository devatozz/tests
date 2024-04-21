import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Container,
  SimpleGrid,
  Image,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { ScrollToTopButton } from "../home/Banner";
import NextLink from "next/link";
// avatar
let stan =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/stan.svg?alt=media&token=3af8bac4-ef14-4937-8389-f771277fde22";
let loki =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/loki.svg?alt=media&token=0d17982c-bfb1-44b0-b123-81469cbcced1";
let frankie =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/frankie.svg?alt=media&token=a1526bc3-0eeb-4130-9475-7f2a761e3aae";
let brian =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/brian.svg?alt=media&token=71f3ee06-37de-4207-9df3-0e966dc13567";
let david =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/david.svg?alt=media&token=709cd544-c402-451c-81b8-0a25ec66803a";

const AVATAR = [
  {
    name: "STAN A CHANCE",
    title: "Chief Airdrop Officer",
    img: stan,
    x: "https://twitter.com/stanachance",
    tele: "https://t.me/stanachance",
    in: "",
  },
  {
    name: "DEV LOKI",
    title: "Chief Product Officer",
    img: loki,
    x: "https://twitter.com/DevLoki888",
    tele: "https://t.me/tonyWalkerReal",
    in: "https://www.linkedin.com/in/tuan-tran-051439178/",
  },
  {
    name: "FRANKIE",
    title: "Chief Executive Officer",
    img: frankie,
    x: "https://twitter.com/0xfr4nkie",
    tele: "https://t.me/frankiem33m",
    in: "https://www.linkedin.com/in/0xfrank",
  },
  {
    name: "BRIAN",
    title: "Chief Finance Officer",
    img: brian,
    x: "",
    tele: "https://t.me/brianonus",
    in: "https://www.linkedin.com/in/brian-tran-59341411a/",
  },
  {
    name: "DAVID",
    title: "Chief Strategy Officer",
    img: david,
    x: "",
    tele: "",
    in: "https://www.linkedin.com/in/davidtanxy/",
  },
];
// partner
let partner1 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/1.svg?alt=media&token=21acacdb-0cb6-464a-8d71-4e088fc70a7d";
let partner2 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/2.svg?alt=media&token=0ae9ff08-d186-4864-965b-a1a0a4db9721";
let partner3 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/3.svg?alt=media&token=6df97c6e-2da9-4e9c-b702-767664eef911";
let partner4 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/4.svg?alt=media&token=ea6b061a-a87e-4d22-85dc-0c8a550015e0";
let partner5 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/5.svg?alt=media&token=6d9c1d51-f2cd-4229-a906-dbea754e2542";
let partner6 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/6.svg?alt=media&token=775c96c0-5c05-41c6-a722-4e0e5d7615ca";
let partner7 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/7.svg?alt=media&token=f7b7364c-a7e4-4fbf-8fc6-10f6f207c4a4";
let partner8 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/8.svg?alt=media&token=6decefa7-4c71-4d0f-b331-9c467217cd1b";
let partner9 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/9.svg?alt=media&token=971aa326-b0a6-43f0-8a0a-21768610b798";
let partner10 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/10.svg?alt=media&token=066cfe52-a079-4164-ae04-81c8b58f2cc2";
let partner11 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/11.svg?alt=media&token=759476ef-b57e-43d9-b085-2db9578d12f8";
let partner12 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/12.svg?alt=media&token=3c2b128f-39a8-4ac2-9677-2375773b5567";
let partner13 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/13.svg?alt=media&token=9a1b24f4-a3d8-4e58-8e47-281b487ade1e";
let partner14 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/14.svg?alt=media&token=62dc6f2b-bb8d-4f87-87bc-1a232fd04e2b";
let partner15 =
  "https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/15.svg?alt=media&token=1d55d277-a511-47a1-aca8-617edb13ce50";
const PARTNER_IMG = [
  {
    img: partner1,
  },
  {
    img: partner2,
  },
  {
    img: partner3,
  },
  {
    img: partner4,
  },
  {
    img: partner5,
  },
  {
    img: partner6,
  },
  {
    img: partner7,
  },
  {
    img: partner8,
  },
  {
    img: partner9,
  },
  {
    img: partner10,
  },
  {
    img: partner11,
  },
  {
    img: partner12,
  },
  {
    img: partner13,
  },
  {
    img: partner14,
  },
  {
    img: partner15,
  },
];
const index = () => {
  const [avatar, setavtar] = useState("./asset/avatar/stan.svg");
  const [imageXSrc, setImageXSrc] = useState("./asset/img/x.svg");
  const [imageTeleSrc, setImageTeleSrc] = useState("./asset/img/tele.svg");
  const [imageInSrc, setImageInSrc] = useState("./asset/img/in.svg");
  const [hoveredItemX, setHoveredItemX] = useState(null);
  const [hoveredItemTele, setHoveredItemTele] = useState(null);
  const [hoveredItemIn, setHoveredItemIn] = useState(null);
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
        <Container maxW={{ base: "90%", '2xl': '100%' }} p='0'>
          <Box py={{ md: 12, lg: 16 }}>
            <Box align={"center"}>
              <Heading
                fontWeight={400}
                fontSize={{
                  base: "28px",
                  xl: "36px",
                  "2xl": "80px",
                }}
                lineHeight={{
                  base: "36px",
                  xl: "50px",
                  "2xl": "70px",
                }}
                color={"#fff"}
                textAlign={{ md: "left", base: "left" }}
              >
                FOUNDED BY THE
                <span style={{ color: "#0068FF" }}> BEST </span>
                OF WEB3
              </Heading>
            </Box>
            <Box border={"1px solid gray"} margin={"64px 0px"}></Box>
            <Box align={"center"} marginBottom={"60px"} maxW='1680px'>
              <Text
                color={"#fff"}
                fontSize={{ base: "15px", xl: "20px", "2xl": "24px" }}
                lineHeight={{ base: "24pxpx", xl: "28px", "2xl": "36px" }}
                fontFamily="Anta"
                textAlign={{ md: "left", base: "left" }}
                fontWeight={{ base: 400, md: 400 }}
              >
                Blockchain technology, a decentralized and immutable ledger
                system, has catalyzed the emergence of DeFi and Web3,
                representing the next evolutionary phase of the internet, and we
                are here for it. Our founding team possesses extensive expertise
                in constructing and expanding high-capacity systems. We
                concurrently carry out a comprehensive array of projects across
                diverse domains: DEX, Non-custodial Wallet, Stablecoin, NFT,
                Games, Launchpad, Perpetual Exchange, Bridge, Faucet, Block
                Explorer, Node, RPC Endpoint, Staking Interface, Marketing
                Services, and more.
              </Text>
            </Box>

            {/* Image avatar */}
            <Box
              margin={"20px auto"}
              display={"flex"}
              alignItems={{ base: 'center', md: "flex-start" }}
              justifyContent={{ base: 'center', md: "flex-start" }}
              gap={'24px'}
              flexWrap={"wrap"}
            >
              {/* avatar card */}
              {AVATAR.map((item, index) => (
                <Box
                  display={"flex"}
                  alignItems={{ base: 'center', md: "flex-start" }}
                  justifyContent={{ base: 'center', md: "flex-start" }}
                  flexDirection={"column"}
                  key={index}
                  margin={"20px 0px"}
                >
                  <Image
                    src={item.img}
                    alt="avatar"
                    height={"317px"}
                    width={"317px"}
                    filter={"grayscale(1)"}
                    _hover={{
                      filter: "none",
                    }}
                  />
                  <Text
                    color={"#0068FF"}
                    fontSize={{ base: "16px", md: "26px" }}
                    fontWeight={{ base: "300", md: "400" }}
                    lineHeight={{ base: "19px", md: "26px" }}
                    fontFamily="Anta"
                    fontStyle={"normal"}
                    paddingTop={{ md: "40px", base: "10px" }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "18px", md: "22px" }}
                    fontWeight={{ base: "300", md: "400" }}
                    lineHeight={{ base: "19px", md: "26px" }}
                    fontFamily="Anta"
                    fontStyle={"normal"}
                    paddingTop={{ md: "12px", base: "10px" }}
                  >
                    {item.title}
                  </Text>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    gap={"10px"}
                    marginTop={"24px"}
                  >
                    {item.x && (
                      <NextLink href={item.x} target="_blank">
                        <Flex
                          gap={2}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Box
                            as="span"
                            cursor="pointer"
                            onMouseEnter={() => setHoveredItemX(item.name)}
                            onMouseLeave={() => setHoveredItemX(null)}
                            transition="0.2s ease-in-out"
                          >
                            <Image
                              src={
                                hoveredItemX === item.name
                                  ? "./asset/img/x2.svg"
                                  : "./asset/img/x.svg"
                              }
                              alt="Icons"
                              height={"38px"}
                              width={"38px"}
                            />
                          </Box>
                        </Flex>
                      </NextLink>
                    )}
                    {item.tele && (
                      <NextLink href={item.tele} target="_blank">
                        <Flex
                          gap={2}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Box
                            as="span"
                            cursor="pointer"
                            onMouseEnter={() => setHoveredItemTele(item.name)}
                            onMouseLeave={() => setHoveredItemTele(null)}
                            transition="0.2s ease-in-out"
                          >
                            <Image
                              src={
                                hoveredItemTele === item.name
                                  ? "./asset/img/tele2.svg"
                                  : "./asset/img/tele.svg"
                              }
                              alt="Icons"
                              height={"38px"}
                              width={"38px"}
                            />
                          </Box>
                        </Flex>
                      </NextLink>
                    )}
                    {item.in && (
                      <NextLink href={item.in} target="_blank">
                        <Flex
                          gap={2}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Box
                            as="span"
                            cursor="pointer"
                            onMouseEnter={() => setHoveredItemIn(item.name)}
                            onMouseLeave={() => setHoveredItemIn(null)}
                            transition="0.2s ease-in-out"
                          >
                            <Image
                              src={
                                hoveredItemIn === item.name
                                  ? "./asset/img/in2.svg"
                                  : "./asset/img/in.svg"
                              }
                              alt="Icons"
                              height={"38px"}
                              width={"38px"}
                            />
                          </Box>
                        </Flex>
                      </NextLink>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box align={"center"} marginTop={"160px"}>
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
                TRUSTED BY THE
                <span style={{ color: "#0068FF" }}> BEST </span>
                OF CRYPTO
              </Heading>
            </Box>
            <Box border={"1px solid gray"} margin={"64px 0px"}></Box>
            <Box align={"center"}>
              <Text
                color={"#fff"}
                fontSize={{ base: "15px", xl: "20px", "2xl": "24px" }}
                lineHeight={{ base: "24pxpx", xl: "28px", "2xl": "40px" }}
                fontFamily="Anta"
                textAlign={{ md: "left", base: "left" }}
                fontWeight={{ base: 400, md: 400 }}
              >
                Our partners are building top-tier products that are changing
                the crypto landscape.
              </Text>
            </Box>
            {/* Image avatar */}
            <Box
              margin={"80px auto"}
              display={"flex"}
              alignItems={{ base: 'center', md: "flex-start" }}
              justifyContent={{ base: 'center', md: "flex-start" }}
              gap={'24px'}
              flexWrap={"wrap"}
            >
              {/* avatar card */}
              {PARTNER_IMG.map((item, index) => (
                <Box
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  flexDirection={"column"}
                  key={index}
                >
                  <Image
                    src={item.img}
                    alt="avatar"
                    height={"317px"}
                    width={"317px"}
                    filter={"grayscale(1)"}
                    _hover={{
                      filter: "none",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Flex>
      <ScrollToTopButton />
    </Box>
  );
};

export default index;
