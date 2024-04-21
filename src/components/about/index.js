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
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/avatar/stan.svg";
let loki =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/avatar/loki.svg";
let frankie =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/avatar/frankie.svg";
let brian =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/avatar/brian.svg";
let david =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/avatar/david.svg";

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
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/1.svg";
let partner2 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/2.svg";
let partner3 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/3.svg";
let partner4 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/4.svg";
let partner5 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/5.svg";
let partner6 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/6.svg";
let partner7 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/7.svg";
let partner8 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/8.svg";
let partner9 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/9.svg";
let partner10 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/10.svg";
let partner11 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/11.svg";
let partner12 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/12.svg";
let partner13 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/13.svg";
let partner14 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/14.svg";
let partner15 =
  "https://raw.githubusercontent.com/Monoswap/images-repo/e23e208570013f0a888d5267e6df788656ae5220/m33m/partner/15.svg";
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
                FOUNDED BY THE
                <span style={{ color: "#0068FF" }}> BEST </span>
                OF WEB3
              </Heading>
            </Box>
            <Box border={"1px solid gray"} margin={"30px 0px"}></Box>
            <Box align={"center"} marginBottom={"60px"}>
              <Text
                color={"#fff"}
                fontSize={{ base: "15px", xl: "20px", "2xl": "24px" }}
                lineHeight={{ base: "24pxpx", xl: "28px", "2xl": "40px" }}
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
              alignItems={"flex-start"}
              justifyContent={"center"}
              gap={10}
              flexWrap={"wrap"}
            >
              {/* avatar card */}
              {AVATAR.map((item, index) => (
                <Box
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  flexDirection={"column"}
                  key={index}
                  margin={"20px 0px"}
                >
                  <Image
                    src={item.img}
                    alt="avatar"
                    height={"300px"}
                    width={"300px"}
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
                    paddingTop={{ md: "20px", base: "10px" }}
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
                    paddingTop={{ md: "20px", base: "10px" }}
                  >
                    {item.title}
                  </Text>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    gap={"10px"}
                    marginTop={"20px"}
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
            <Box align={"center"} marginTop={"80px"}>
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
                TRUSTED BY THE
                <span style={{ color: "#0068FF" }}> BEST </span>
                OF CRYPTO
              </Heading>
            </Box>
            <Box border={"1px solid gray"} margin={"30px 0px"}></Box>
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
              alignItems={"flex-start"}
              justifyContent={"center"}
              gap={10}
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
                    height={"300px"}
                    width={"300px"}
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
