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
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { Link, animateScroll as scroll } from "react-scroll";
import NextLink from "next/link";
import TradingViewWidget from "src/components/home/PriceSlider";
export default function Banner() {
  const [feature_items, setfeature_items] = useState([
    {
      id: "1",
      label: "Derivative Trading",
      icons_dark: "/grap_up_dark.png",
      icons_light: "/grap_up_light.png",
      backgroundImage:
        "linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)",
      isActive: false,
      isActive: false,
      title: "With up to 200x leverage ",
      borderColor: "#EBC28E",
      description:
        "Boost your Long/Short positions with up to 200x leverage, minimal slippage, and totally no price impact.",
    },
    {
      id: "2",
      label: "Lowest Fees",
      icons_dark: "/money_dark.png",
      icons_light: "/money_light.png",
      borderColor: "#B7F7EE",

      backgroundImage:
        "linear-gradient(92.68deg, #62E6D4 -19.2%, #B7F7EE 118.24%)",

      isActive: false,
      title: " In the whole ecosystem",
      description:
        "It costs only 0.04% of your size to open or close a position. No price impacts. No liquidation fees.",
    },
    {
      id: "3",
      label: " Real World Assets",
      icons_dark: "/bank_dark.png",
      icons_light: "/bank_light.png",
      borderColor: "#FFA998",

      backgroundImage:
        "linear-gradient(92.68deg, #FF5132 -19.2%, #FFA998 118.24%)",

      isActive: true,
      title: " Without any boundaries",
      description:
        "Imagine trading crypto, stocks, commodities, and indices on a decentralized platform. Powered by Zero-knowledge technology.",
    },
    {
      id: "4",
      label: "Swap Intergration",
      icons_dark: "/swap_dark.png",
      icons_light: "/swap_light.png",
      borderColor: "#FBFBFB",

      backgroundImage:
        " linear-gradient(92.68deg, #5B5B5B -19.2%, #FBFBFB 118.24%)",

      isActive: false,
      title: "With abundant liquidity",
      description:
        "Swap between supported assets with low fees and get ready for your leveraged trades.",
    },
  ]);

  const handleBoxClick = (id) => {
    const updatedItems = feature_items.map((item) => {
      if (item.id === id) {
        return { ...item, isActive: true };
      } else {
        return { ...item, isActive: false };
      }
    });
    setfeature_items(updatedItems);
  };
  const ScrollToTopButton = () => {
    return (
      <Link
        to="top"
        spy={true}
        smooth={true}
        duration={500}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="50px"
          height="50px"
          backgroundImage="linear-gradient(93.03deg, #101010 -7.42%, #5B5B5B 50.62%, #101010 109.79%)"
          borderRadius="8px"
          cursor="pointer"
        >
          <ChevronUpIcon boxSize={{ md: "8", base: "6" }} color={"#fbfbfb"} />
        </Box>
      </Link>
    );
  };
  return (
    <Box m={0} w={"100%"} p={"0px"} bg="#101010">
      <Flex
        alignItems={"center"}
        position={"relative"}
        p={{ base: "40px 0", md: "100px 0" }}
        backgroundImage="url('./bgSection2.png') "
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Container maxW={"100%"}>
          <Stack
            as={Box}
            spacing={{ base: 8, md: 12 }}
            py={{ base: 20, md: 36 }}
          >
            <Box align={"center"}>
              <Heading
                fontWeight={300}
                fontSize={{ base: "40px", md: "82px" }}
                lineHeight={{ md: "106px", base: "44px" }}
                color={"#62E6D4"}
                textAlign={"center"}
                maxW={{ md: "1482px", base: "350px" }}
              >
                Trade Without Boundaries <br /> Powered by{" "}
                <Heading
                  as={"span"}
                  color={"#FFEEDA"}
                  fontWeight={300}
                  fontSize={{ base: "40px", md: "96px" }}
                  lineHeight={{ md: "106px", base: "44px" }}
                >
                  Scroll
                </Heading>
              </Heading>
            </Box>

            <Box align={"center"}>
              <Text
                color={"#FBFBFB"}
                fontSize={{ base: "16px", md: "32px" }}
                fontWeight={{ base: "300", md: "400" }}
                lineHeight={{ base: "19px", md: "38px" }}
                fontFamily="body"
                maxW={{ md: "1092px", base: "350px" }}
                fontStyle={"normal"}
              >
                Trade with up to 200x leverage on crypto, stocks, commodities,
                and indices on the Scroll-native Decentralized Perpetual
                Exchange
              </Text>
            </Box>

            <Flex
              align="center"
              justify="center"
              pt={8}
              flexDirection={{ base: "column", md: "row" }}
            >
              <NextLink href={"https://app.zkperp.tech/"}>
                <Button
                  size="md"
                  backgroundColor={"#EBC28E"}
                  transition="background-color 0.3s ease-in-out"
                  _hover={{
                    bg: "linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)",
                  }}
                  minWidth="180px"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "8px",
                    padding: "16px 26px",
                    fontFamily: "body",
                  }}
                  mb={{ base: 6, md: 0 }}
                  mr={{ base: 0, md: 6 }}
                  width={{ base: "100%", md: "auto" }}
                >
                  Start Trading
                </Button>{" "}
              </NextLink>
              <NextLink href={"https://docs.zkperp.tech/"}>
                <Button
                  size="md"
                  border="solid"
                  borderColor="rgba(235, 194, 142, 1)"
                  borderWidth="1px"
                  bg="transparent"
                  transition="background-color 0.3s ease-out"
                  _hover={{
                    bg: "transparent",
                  }}
                  minWidth="180px"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "8px",
                    padding: "16px 26px",
                    fontFamily: "body",
                  }}
                  width={{ base: "100%", md: "auto" }}
                >
                  <Text color={"#FBFBFB"}>Documentation</Text>
                </Button>
              </NextLink>
            </Flex>
          </Stack>
        </Container>
      </Flex>
      {/* trading view  */}
      <Box
        sx={{
          borderTop: "0.5px solid #FBFBFB",
          borderBottom: "0.5px solid #FBFBFB",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <TradingViewWidget />
        </div>
      </Box>
      <Box
        backgroundImage="url('./Stars.png') "
        backgroundSize="cover"
        backgroundPosition="center"
        p={0}
      >
        {/* Trade swap */}
        <Box id="about" position={"relative"}>
          <Container maxW={"8xl"} py={{ md: "24", base: "16" }} align="center">
            <Heading
              fontWeight={300}
              fontSize={{ base: "28px", md: "56px" }}
              lineHeight={{ md: "62px", base: "42px" }}
              maxW={{ base: "312px", md: "1200px" }}
              color={"#FBFBFB"}
              textAlign="center"
            >
              Trade. Swap. Add Liquidity. <br />
              Optimized With{" "}
              <Heading
                as={"span"}
                color={"#62E6D4"}
                fontWeight={300}
                fontSize={{ base: "28px", md: "56px" }}
                lineHeight={{ md: "62px", base: "42px" }}
                maxW={{ base: "312px", md: "1200px" }}
              >
                Zero-knowledge
              </Heading>
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={10}
              mt={{ md: "24", base: "12" }}
            >
              <Stack spacing={8} justifyContent={"space-between"}>
                {feature_items.map((items, index) => (
                  <>
                    <Flex
                      spacing={4}
                      key={items.id}
                      justifyContent={{ md: "flex-end", base: "center" }}
                    >
                      <Flex
                        size="md"
                        bg={
                          items.isActive ? "transparent" : items.backgroundImage
                        }
                        color={items.borderColor}
                        boxShadow={items.isActive ? items.borderColor : "none"}
                        border={items.isActive ? "solid" : "none"}
                        borderWidth="1px"
                        borderRadius="8px"
                        width={"600px"}
                        height={"80px"}
                        alignItems="center"
                        justifyContent="flex-start"
                        gap={4}
                        px={8}
                        cursor={"pointer"}
                        onClick={() => handleBoxClick(items.id)}
                      >
                        <Flex
                          bg={items.isActive ? "#fbfbfb" : "#101010"}
                          width={"40px"}
                          height={"40px"}
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="8px"
                        >
                          <Image
                            src={
                              items.isActive
                                ? items.icons_dark
                                : items.icons_light
                            }
                            alt="zk perp"
                            h={26}
                            color={items.isActive ? "#fbfbfb" : "#101010"}
                          />
                        </Flex>

                        <Text
                          color={items.isActive ? "#fbfbfb" : "#101010"}
                          fontSize={{ md: "32px", base: "20px" }}
                          lineHeight={{ md: "39px", base: "24px" }}
                          fontWeight={500}
                          fontFamily="body"
                        >
                          {items.label}
                        </Text>
                      </Flex>
                    </Flex>
                    {items.isActive && (
                      <Flex
                        position="relative"
                        backgroundImage="url('./Card.png') "
                        backgroundSize="cover"
                        backgroundPosition="center"
                        p={0}
                        display={{ md: "none" }}
                      >
                        <Box
                          w="full"
                          direction={"row"}
                          spacing={4}
                          alignItems="left"
                          bgGradient="radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)"
                          backgroundBlendMode="overlay"
                          borderRadius="8px"
                          border="solid"
                          borderWidth="0.3px"
                          color="#FBFBFB"
                          p={{ md: "12", base: "6" }}
                          align="left"
                        >
                          {feature_items.map(
                            (items, index) =>
                              items.isActive && (
                                <Box
                                  width={{ base: "100%", md: "70%" }}
                                  key={items.id}
                                >
                                  <Flex
                                    size="md"
                                    bg="transparent"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    gap={4}
                                    px={0}
                                  >
                                    <Flex
                                      bg="#FBFBFB"
                                      width={"40px"}
                                      height={"40px"}
                                      alignItems="center"
                                      justifyContent="center"
                                      borderRadius="8px"
                                    >
                                      <Image
                                        src={items.icons_dark}
                                        alt="zk perp"
                                        h={26}
                                      />
                                    </Flex>

                                    <Text
                                      color={"#FBFBFB"}
                                      fontSize={{ md: "32px", base: "20px" }}
                                      lineHeight={{ md: "39px", base: "24px" }}
                                      fontWeight={500}
                                      fontFamily="body"
                                    >
                                      {items.title}
                                    </Text>
                                  </Flex>
                                  <Box>
                                    <Text
                                      color={"#FBFBFB"}
                                      fontSize={{ md: "24px", base: "16px" }}
                                      lineHeight={{ md: "39px", base: "24px" }}
                                      fontWeight={400}
                                      pt={8}
                                      fontFamily="body"
                                    >
                                      {items.description}
                                    </Text>
                                  </Box>

                                  <Flex
                                    pt={8}
                                    flexDirection={{
                                      base: "column",
                                      md: "row",
                                    }}
                                  >
                                    <NextLink href={"https://app.zkperp.tech/"}>
                                      <Button
                                        size="md"
                                        backgroundColor={"#EBC28E"}
                                        transition="background-color 0.3s ease-in-out"
                                        _hover={{
                                          bg: "linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)",
                                        }}
                                        minWidth="180px"
                                        fontFamily="body"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "16px",
                                          borderRadius: "8px",
                                          padding: "16px 51px",
                                          fontFamily: "body",
                                        }}
                                        mb={{ base: 6, md: 0 }}
                                        mr={{ base: 0, md: 6 }}
                                        width={{ base: "200px", md: "auto" }}
                                      >
                                        Trade Now
                                      </Button>{" "}
                                    </NextLink>

                                    <NextLink
                                      href={"https://docs.zkperp.tech/"}
                                    >
                                      <Button
                                        size="md"
                                        border="solid"
                                        borderColor="rgba(235, 194, 142, 1)"
                                        borderWidth="1px"
                                        bg="transparent"
                                        transition="background-color 0.3s ease-out"
                                        minWidth="180px"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "16px",
                                          borderRadius: "8px",
                                          padding: "16px 51px",
                                          fontFamily: "body",
                                        }}
                                        _hover={{
                                          bg: "transparent",
                                        }}
                                        width={{ base: "200px", md: "auto" }}
                                      >
                                        <Text color={"#FBFBFB"}>
                                          Learn More
                                        </Text>
                                      </Button>
                                    </NextLink>
                                  </Flex>
                                </Box>
                              )
                          )}
                        </Box>
                      </Flex>
                    )}
                  </>
                ))}
              </Stack>
              <Flex
                position="relative"
                backgroundImage="url('./Card.png') "
                backgroundSize="cover"
                backgroundPosition="center"
                p={0}
                display={{ base: "none", md: "flex" }}
              >
                <Box
                  w="full"
                  direction={"row"}
                  spacing={4}
                  alignItems="left"
                  bgGradient="radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)"
                  backgroundBlendMode="overlay"
                  borderRadius="8px"
                  border="solid"
                  borderWidth="0.3px"
                  color="#FBFBFB"
                  p={8}
                  align="left"
                  width={{ md: "800px" }}
                  height={{ md: "440px" }}
                >
                  {feature_items.map(
                    (items, index) =>
                      items.isActive && (
                        <Box
                          width={{ base: "100%", md: "80%" }}
                          key={items.id}
                          align="left"
                          pb={8}
                        >
                          <Flex
                            size="md"
                            bg="transparent"
                            alignItems="center"
                            justifyContent="flex-start"
                            gap={4}
                            px={0}
                          >
                            <Flex
                              bg="#FBFBFB"
                              width={"40px"}
                              height={"40px"}
                              alignItems="center"
                              justifyContent="center"
                              borderRadius="8px"
                            >
                              <Image
                                src={items.icons_dark}
                                alt="zk perp"
                                h={26}
                              />
                            </Flex>

                            <Text
                              color={"#FBFBFB"}
                              fontSize={{ md: "32px", base: "20px" }}
                              lineHeight={{ md: "39px", base: "24px" }}
                              fontWeight={500}
                              fontFamily="body"
                            >
                              {items.title}
                            </Text>
                          </Flex>
                          <Box py={8}>
                            <Text
                              color={"#FBFBFB"}
                              fontSize={{ md: "24px", base: "18px" }}
                              lineHeight="29px"
                              fontWeight={400}
                              pt={8}
                              fontFamily={"body"}
                            >
                              {items.description}
                            </Text>
                          </Box>

                          <Flex
                            align="center"
                            justify="center"
                            pt={8}
                            flexDirection={{ base: "column", md: "row" }}
                          >
                            <NextLink href={"https://app.zkperp.tech/"}>
                              <Button
                                size="md"
                                backgroundColor={"#EBC28E"}
                                transition="background-color 0.3s ease-in-out"
                                _hover={{
                                  bg: "linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)",
                                }}
                                minWidth="180px"
                                fontFamily="body"
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  borderRadius: "8px",
                                  padding: "16px 51px",
                                  fontFamily: "body",
                                }}
                                mb={{ base: 6, md: 0 }}
                                mr={{ base: 0, md: 6 }}
                                width={{ base: "200px", md: "auto" }}
                              >
                                Trade Now
                              </Button>{" "}
                            </NextLink>

                            <NextLink href={"https://docs.zkperp.tech/"}>
                              <Button
                                size="md"
                                border="solid"
                                borderColor="rgba(235, 194, 142, 1)"
                                borderWidth="1px"
                                bg="transparent"
                                transition="background-color 0.3s ease-out"
                                minWidth="180px"
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  borderRadius: "8px",
                                  padding: "16px 51px",
                                  fontFamily: "body",
                                }}
                                _hover={{
                                  bg: "transparent",
                                }}
                                width={{ base: "200px", md: "auto" }}
                              >
                                <Text color={"#FBFBFB"}>Learn More</Text>
                              </Button>
                            </NextLink>
                          </Flex>
                        </Box>
                      )
                  )}
                </Box>
              </Flex>
            </SimpleGrid>
          </Container>
        </Box>
        {/* two token */}
        <Box id="alphatestnet" position={"relative"}>
          <Container maxW={"8xl"} py={{ md: "24", base: "8" }} align="center">
            <Heading
              fontWeight={300}
              fontSize={{ base: "28px", md: "56px" }}
              lineHeight={{ md: "62px", base: "42px" }}
              maxW={{ base: "312px", md: "1200px" }}
              color={"#FBFBFB"}
              textAlign="center"
            >
              Two Tokens That Shape The{" "}
              <Heading
                as={"span"}
                color={"#62E6D4"}
                fontWeight={300}
                fontSize={{ base: "28px", md: "56px" }}
                lineHeight={{ md: "62px", base: "42px" }}
                maxW={{ base: "312px", md: "1200px" }}
              >
                Protocol
              </Heading>
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={24}>
              <Flex
                position="relative"
                backgroundImage="url('./Card.png') "
                backgroundSize="cover"
                backgroundPosition="center"
                p={0}
              >
                <Box
                  w="full"
                  direction={"row"}
                  spacing={4}
                  alignItems="left"
                  bgGradient="radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)"
                  backgroundBlendMode="overlay"
                  borderRadius="8px"
                  border="solid"
                  borderWidth="0.3px"
                  color="#FBFBFB"
                  p={8}
                >
                  <Box width={{ base: "100%", md: "70%" }} py={4}>
                    <Flex
                      size="md"
                      bg="transparent"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap={4}
                      px={0}
                    >
                      <Flex
                        bg="transparent"
                        width={{ md: "80px", base: "60px" }}
                        height={{ md: "80px", base: "60px" }}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="8px"
                      >
                        <Image src={"/zkp.png"} alt="zk perp" w="full" />
                      </Flex>

                      <Text
                        color={"#FBFBFB"}
                        fontSize={{ md: "32px", base: "24px" }}
                        lineHeight="39px"
                        fontWeight={500}
                      >
                        ZKP
                      </Text>
                    </Flex>
                    <Box align={"left"}>
                      <Text
                        color={"#FBFBFB"}
                        fontSize={{ md: "24px", base: "16px" }}
                        lineHeight={{ md: "29px", base: "24px" }}
                        fontWeight={400}
                        pt={4}
                        fontFamily="body"
                      >
                        ZKP serves as both the utility and governance token and
                        accumulates 30% of the fees generated by the protocol.
                      </Text>
                    </Box>
                  </Box>
                  <Flex
                    gap={4}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                    justifyContent={"flex-end"}
                    pt={8}
                  >
                    <NextLink href={"https://docs.zkperp.tech/tokenomics/zkp"}>
                      <Button
                        size="md"
                        border="solid"
                        borderColor="rgba(235, 194, 142, 1)"
                        borderWidth="1px"
                        bg="transparent"
                        transition="background-color 0.3s ease-out"
                        minWidth="180px"
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          borderRadius: "8px",
                          padding: "16px 26px",
                          fontFamily: "body",
                        }}
                        _hover={{
                          bg: "transparent",
                        }}
                        width={{ base: "100%", md: "auto" }}
                      >
                        <Text color={"#FBFBFB"}>Learn More</Text>
                      </Button>
                    </NextLink>
                  </Flex>
                </Box>
              </Flex>

              <Flex
                position="relative"
                backgroundImage="url('./Card.png') "
                backgroundSize="cover"
                backgroundPosition="center"
                p={0}
              >
                <Box
                  w="full"
                  direction={"row"}
                  spacing={4}
                  alignItems="left"
                  bgGradient="radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)"
                  backgroundBlendMode="overlay"
                  borderRadius="8px"
                  border="solid"
                  borderWidth="0.3px"
                  color="#FBFBFB"
                  p={8}
                >
                  <Box width={{ base: "100%", md: "70%" }} py={4}>
                    <Flex
                      size="md"
                      bg="transparent"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap={4}
                      px={0}
                    >
                      <Flex
                        bg="transparent"
                        width={{ md: "80px", base: "60px" }}
                        height={{ md: "80px", base: "60px" }}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="8px"
                      >
                        <Image src={"/zlp.png"} alt="zk perp" w="full" />
                      </Flex>

                      <Text
                        color={"#FBFBFB"}
                        fontSize={{ md: "32px", base: "24px" }}
                        lineHeight="39px"
                        fontWeight={400}
                      >
                        ZLP
                      </Text>
                    </Flex>
                    <Box align={"left"}>
                      <Text
                        color={"#FBFBFB"}
                        fontSize={{ md: "24px", base: "16px" }}
                        lineHeight={{ md: "29px", base: "24px" }}
                        fontWeight={400}
                        pt={4}
                        fontFamily="body"
                      >
                        ZLP functions as the liquidity provider token for zkPerp
                        markets and accumulates 70% of the fees generated by
                        these markets.
                      </Text>
                    </Box>
                  </Box>
                  <Flex
                    gap={4}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                    justifyContent={"flex-end"}
                    pt={8}
                  >
                    <NextLink href={"https://docs.zkperp.tech/tokenomics/zlp"}>
                      <Button
                        size="md"
                        border="solid"
                        borderColor="rgba(235, 194, 142, 1)"
                        borderWidth="1px"
                        _hover={{
                          bg: "transparent",
                        }}
                        bg="transparent"
                        transition="background-color 0.3s ease-out"
                        minWidth="180px"
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          borderRadius: "8px",
                          padding: "16px 26px",
                          fontFamily: "body",
                        }}
                        width={{ base: "100%", md: "auto" }}
                      >
                        <Text color={"#FBFBFB"}>Learn More</Text>
                      </Button>
                    </NextLink>
                  </Flex>
                </Box>
              </Flex>
            </SimpleGrid>
          </Container>
        </Box>
        {/* alpha testnet */}
        <Box align="center" py={{ md: 12, base: "4" }}>
          <Image alt={"Line image"} src="/Line.png" objectFit={"cover"} />
        </Box>
        <Container maxW={"8xl"} py={{ md: 24, base: "12" }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
            <Stack
              spacing={6}
              justifyContent="center"
              textAlign={{ md: "left", base: "center" }}
              align={{ base: "center", md: "left" }}
            >
              <Heading
                color={"#FFDCB1"}
                fontSize={{ base: "24px", md: "32px" }}
                lineHeight={{ md: "62px", base: "32px" }}
                fontWeight={300}
              >
                Alpha Testnet (Comming Soon)
              </Heading>
              <Heading
                fontWeight={300}
                fontSize={{ base: "28px", md: "48px" }}
                lineHeight={{ md: "78px", base: "42px" }}
                maxW={{ base: "312px", md: "1200px" }}
                color={"#FBFBFB"}
              >
                Trade, Win, and Share <br />
                <Heading
                  as={"span"}
                  color={"#62E6D4"}
                  fontWeight={300}
                  fontSize={{ base: "28px", md: "48px" }}
                  lineHeight={{ md: "62px", base: "42px" }}
                  maxW={{ base: "312px", md: "1200px" }}
                >
                  100,000,000 ZKP
                </Heading>
              </Heading>
            </Stack>
            <Flex justifyContent={{ base: "center", md: "flex-start" }}>
              <Box>
                <Image
                  alt={"feature image"}
                  src="/alphatestnet.png"
                  objectFit={"cover"}
                  maxW={{ md: "600px", base: "350px" }}
                  top={0}
                  left={0}
                />
              </Box>
            </Flex>
            <Flex
              pt={4}
              flexDirection={{ base: "column", md: "row" }}
              justifyContent={{ base: "center", md: "flex-start" }}
              alignItems={{ base: "center", md: "flex-start" }}
            >
              <NextLink href={"#"}>
                <Button
                  size="md"
                  backgroundColor={"#EBC28E"}
                  transition="background-color 0.3s ease-in-out"
                  _hover={{
                    bg: "linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)",
                  }}
                  minWidth="180px"
                  fontFamily="body"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "8px",
                    padding: "16px 51px",
                    fontFamily: "body",
                  }}
                  mb={{ base: 6, md: 0 }}
                  mr={{ base: 0, md: 6 }}
                  width={{ base: "200px", md: "auto" }}
                >
                  Join Now
                </Button>{" "}
              </NextLink>

              <NextLink
                href={"https://docs.zkperp.tech/introduction/alpha-testnet"}
              >
                <Button
                  size="md"
                  border="solid"
                  borderColor="rgba(235, 194, 142, 1)"
                  borderWidth="1px"
                  _hover={{
                    bg: "transparent",
                  }}
                  bg="transparent"
                  transition="background-color 0.3s ease-out"
                  minWidth="180px"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "8px",
                    padding: "16px 51px",
                    fontFamily: "body",
                  }}
                  width={{ base: "200px", md: "auto" }}
                >
                  <Text color={"#FBFBFB"}>Discover</Text>
                </Button>
              </NextLink>
            </Flex>
          </SimpleGrid>
        </Container>
        <Box align="center" py={{ md: 12, base: "4" }}>
          <Image alt={"Line image"} src="/Line.png" objectFit={"cover"} />
        </Box>
        {/* comunity */}
        <Box>
          <Container
            maxW={"8xl"}
            py={{ md: "24", base: "16" }}
            align="center"
            position="relative"
          >
            <Box
              width={"full"}
              position={"absolute"}
              bottom={270}
              display={{ base: "none", md: "block" }}
            >
              <Image src={"./image131.png"} alt="zk perp" w="full" />
            </Box>
            <Heading
              fontWeight={300}
              fontSize={{ base: "28px", md: "56px" }}
              lineHeight={{ md: "62px", base: "42px" }}
              maxW={{ base: "312px", md: "1200px" }}
              color={"#FBFBFB"}
              textAlign="center"
            >
              Join The Most United <br />
              Community In The{" "}
              <Heading
                as={"span"}
                color={"#62E6D4"}
                fontWeight={300}
                fontSize={{ base: "28px", md: "56px" }}
                lineHeight={{ md: "62px", base: "42px" }}
                maxW={{ base: "312px", md: "1200px" }}
              >
                Ecosystem
              </Heading>
            </Heading>
            <Text
              textAlign="center"
              color={"#fbfbfb"}
              mt={{ md: "12", base: "8" }}
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight={400}
              fontFamily="body"
            >
              zkPerp was build by Scrollers , for the Scrollers
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={24}>
              <NextLink href={"https://twitter.com/zkPerp"} target="self_">
                <Flex
                  position="relative"
                  bgImage={{
                    md: "url('/Card.png', radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%))",
                    base: "url('/Card.png')",
                  }}
                  bgSize={"cover"}
                  bgBlendMode="overlay, normal"
                  backdropFilter="blur(40px)"
                  borderRadius="8px"
                  borderWidth="1px"
                  borderColor="gray.200"
                  overflow="hidden"
                  minHeight={{ md: "240px", base: "200px" }}
                >
                  <Box width={"full"} pt={4} pb={8}>
                    <Flex
                      size="md"
                      bg="transparent"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={4}
                      px={8}
                      py={4}
                    >
                      <Text
                        color={"#FBFBFB"}
                        fontSize="32px"
                        lineHeight="39px"
                        fontWeight={500}
                      >
                        X
                      </Text>
                      <Flex
                        bg="transparent"
                        width={"32px"}
                        height={"32px"}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="8px"
                      >
                        <Image src={"/Vector.png"} alt="zk perp" w="full" />
                      </Flex>
                    </Flex>
                    <Box
                      width={{ md: "160px", base: "100px" }}
                      position="absolute"
                      bottom={0}
                      left={30}
                    >
                      <Image src={"/x1.png"} alt="zk perp" w="full" />
                    </Box>
                  </Box>
                </Flex>
              </NextLink>
              <NextLink
                href={"https://discord.com/invite/zfAjX8pmsz"}
                target="self_"
              >
                <Flex
                  position="relative"
                  bgImage={{
                    md: "url('/Card.png', radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%))",
                    base: "url('/Card.png')",
                  }}
                  bgSize={"cover"}
                  bgBlendMode="overlay, normal"
                  backdropFilter="blur(40px)"
                  borderRadius="8px"
                  borderWidth="1px"
                  borderColor="gray.200"
                  overflow="hidden"
                  minHeight={{ md: "240px", base: "200px" }}
                >
                  <Box width={"full"} pt={4} pb={8}>
                    <Flex
                      size="md"
                      bg="transparent"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={4}
                      px={8}
                      py={4}
                    >
                      <Text
                        color={"#FBFBFB"}
                        fontSize="32px"
                        lineHeight="39px"
                        fontWeight={500}
                      >
                        Discord
                      </Text>
                      <Flex
                        bg="transparent"
                        width={"32px"}
                        height={"32px"}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="8px"
                      >
                        <Image src={"/Vector.png"} alt="zk perp" w="full" />
                      </Flex>
                    </Flex>
                    <Box
                      width={{ md: "160px", base: "100px" }}
                      position="absolute"
                      bottom={0}
                      left={30}
                    >
                      <Image src={"/d1.png"} alt="zk perp" w="full" />
                    </Box>
                  </Box>
                </Flex>
              </NextLink>
              <NextLink href={"https://t.me/zkperp"} target="self_">
                <Flex
                  position="relative"
                  bgImage={{
                    md: "url('/Card.png', radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%))",
                    base: "url('/Card.png')",
                  }}
                  bgSize={"cover"}
                  bgBlendMode="overlay, normal"
                  backdropFilter="blur(40px)"
                  borderRadius="8px"
                  borderWidth="1px"
                  borderColor="gray.200"
                  overflow="hidden"
                  minHeight={{ md: "240px", base: "200px" }}
                >
                  <Box width={"full"} pt={4} pb={8}>
                    <Flex
                      size="md"
                      bg="transparent"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={4}
                      px={8}
                      py={4}
                    >
                      <Text
                        color={"#FBFBFB"}
                        fontSize="32px"
                        lineHeight="39px"
                        fontWeight={500}
                      >
                        Telegram
                      </Text>
                      <Flex
                        bg="transparent"
                        width={"32px"}
                        height={"32px"}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="8px"
                      >
                        <Image src={"/Vector.png"} alt="zk perp" w="full" />
                      </Flex>
                    </Flex>
                    <Box
                      width={{ md: "160px", base: "100px" }}
                      position="absolute"
                      bottom={0}
                      left={30}
                    >
                      <Image src={"/t1.png"} alt="zk perp" w="full" />
                    </Box>
                  </Box>
                </Flex>
              </NextLink>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
      <ScrollToTopButton />
    </Box>
  );
}
