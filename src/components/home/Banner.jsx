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
      title: "With up to 200x leverage ",
      description:
        "Boost your Long/Short positions with up to 200x leverage, minimal slippage, and totally no price impact.",
    },
    {
      id: "2",
      label: "Lowest Fees",
      icons_dark: "/money_dark.png",
      icons_light: "/money_light.png",
      backgroundImage:
        "linear-gradient(92.68deg, #62E6D4 -19.2%, #B7F7EE 118.24%)",

      isActive: false,
      title: " In the whole ecosystem",
      description:
        "It costs only 0.04% of your size to open or close a position. No price impacts. No liquidation fees.",
    },
    {
      id: "3",
      label: " Real Worl Assets",
      icons_dark: "/bank_dark.png",
      icons_light: "/bank_light.png",
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
          background={"pink.400"}
          borderRadius="8px"
        >
          <ChevronUpIcon boxSize={{ md: "8", base: "6" }} />
        </Box>
      </Link>
    );
  };
  return (
    <Box
      //   bgGradient="linear-gradient(90deg, #666666 14.6%, #FFFFFF 101.23%)"
      m={0}
      w={"100%"}
      p={"0px"}
      bg="#101010"
    >
      <Flex
        alignItems={"center"}
        position={"relative"}
        p={{ base: "50px 0", md: "100px 0" }}
        backgroundImage="url('./bgSection2.png') "
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Container maxW={"8xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}
          >
            <Text
              fontWeight={300}
              fontSize={{ base: "6xl", md: "96px" }}
              lineHeight={{ md: "106px", base: "70px" }}
              color={"#62E6D4"}
            >
              Trade Without Boundaries <br />
              Powered by{" "}
              <Text as={"span"} color={"#FFEEDA"}>
                Scroll
              </Text>
            </Text>
            <Text
              color={"#FBFBFB"}
              fontSize={{ base: "20px", md: "32px" }}
              fontWeight={{ base: "300", md: "400" }}
              lineHeight={{ base: "24px", md: "46px" }}
            >
              Trade with up to 200x leverage on crypto, stocks, commodities, and
              indices on the Scroll-native Decentralized Perpetual Exchange
            </Text>
            <Flex
              align="center"
              justify="center"
              pt={8}
              flexDirection={{ base: "column", md: "row" }}
            >
              <NextLink href={"https://app.zkperp.tech/"}>
                <Button
                  size="md"
                  backgroundImage="linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)"
                  transition="background-color 0.3s ease-out"
                  fontWeight="bold"
                  fontSize="16px"
                  borderRadius="8px"
                  padding="16px 26px"
                  minWidth="180px"
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
                  colorScheme="orange"
                  bg="transparent"
                  transition="background-color 0.3s ease-out"
                  fontWeight="bold"
                  fontSize="16px"
                  minWidth="180px"
                  borderRadius="8px"
                  padding="16px 26px"
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
          <Box
            position={"absolute"}
            display={{ base: "none", md: "block" }}
            right={-30}
            bottom={-50}
          >
            <Image src={"./tradebg.png"} alt="zk perp" w="full" />
          </Box>
          <Container maxW={"8xl"} py={24}>
            <Text
              fontWeight={200}
              fontSize={{ base: "5xl", md: "56px" }}
              lineHeight={{ md: "80px" }}
              color={"#FBFBFB"}
              textAlign="center"
            >
              Trade. Swap. Add Liquidity <br />
              Optimized With{" "}
              <Text as={"span"} color={"#62E6D4"}>
                Zero-knowledge
              </Text>
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={24}>
              <Stack spacing={8}>
                {feature_items.map((items, index) => (
                  <>
                    <Flex spacing={4} key={items.id}>
                      <Flex
                        size="md"
                        color="rgba(235, 194, 142, 1)"
                        bg={
                          items.isActive ? "transparent" : items.backgroundImage
                        }
                        border="solid"
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
                          fontSize="32px"
                          lineHeight="39px"
                          fontWeight={500}
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
                          p={12}
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
                                      fontSize={{ md: "32px", base: "22px" }}
                                      lineHeight="39px"
                                      fontWeight={500}
                                    >
                                      {items.title}
                                    </Text>
                                  </Flex>
                                  <Box>
                                    <Text
                                      color={"#FBFBFB"}
                                      fontSize={{ md: "24px", base: "18px" }}
                                      lineHeight="29px"
                                      fontWeight={400}
                                      pt={8}
                                    >
                                      {items.description}
                                    </Text>
                                  </Box>

                                  <Flex
                                    align="center"
                                    justify="center"
                                    pt={8}
                                    flexDirection={{
                                      base: "column",
                                      md: "row",
                                    }}
                                  >
                                    <NextLink href={"https://app.zkperp.tech/"}>
                                      <Button
                                        size="md"
                                        backgroundImage="linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)"
                                        transition="background-color 0.3s ease-out"
                                        fontWeight="bold"
                                        fontSize="24px"
                                        borderRadius="8px"
                                        padding="16px 52px"
                                        mb={{ base: 4, md: 0 }}
                                        mr={{ base: 0, md: 4 }}
                                        width={{ base: "100%", md: "auto" }}
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
                                        colorScheme="orange"
                                        bg="transparent"
                                        transition="background-color 0.3s ease-out"
                                        fontWeight="bold"
                                        fontSize="24px"
                                        borderRadius="8px"
                                        padding="16px 52px"
                                        width={{ base: "100%", md: "auto" }}
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
                  p={12}
                >
                  {feature_items.map(
                    (items, index) =>
                      items.isActive && (
                        <Box width={{ base: "100%", md: "70%" }} key={items.id}>
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
                              fontSize={{ md: "32px", base: "22px" }}
                              lineHeight="39px"
                              fontWeight={500}
                            >
                              {items.title}
                            </Text>
                          </Flex>
                          <Box>
                            <Text
                              color={"#FBFBFB"}
                              fontSize={{ md: "24px", base: "18px" }}
                              lineHeight="29px"
                              fontWeight={400}
                              pt={8}
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
                                backgroundImage="linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)"
                                transition="background-color 0.3s ease-out"
                                fontWeight="bold"
                                fontSize="24px"
                                borderRadius="8px"
                                padding="16px 52px"
                                mb={{ base: 4, md: 0 }}
                                mr={{ base: 0, md: 4 }}
                                width={{ base: "100%", md: "auto" }}
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
                                colorScheme="orange"
                                bg="transparent"
                                transition="background-color 0.3s ease-out"
                                fontWeight="bold"
                                fontSize="24px"
                                borderRadius="8px"
                                padding="16px 52px"
                                width={{ base: "100%", md: "auto" }}
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
          <Box
            position={"absolute"}
            display={{ base: "none", md: "block" }}
            left={30}
            bottom={-50}
          >
            <Image src={"./two.png"} alt="zk perp" w="full" />
          </Box>

          <Container maxW={"8xl"} py={24}>
            <Text
              fontWeight={300}
              lineHeight={{ md: "62px" }}
              fontSize={{ base: "5xl", md: "56px" }}
              color={"#FBFBFB"}
              textAlign="center"
            >
              Two Tokens That Shape The{" "}
              <Text as={"span"} color={"#62E6D4"}>
                Protocol
              </Text>
            </Text>
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
                    <Box>
                      <Text
                        color={"#FBFBFB"}
                        fontSize="24px"
                        lineHeight="29px"
                        fontWeight={400}
                        pt={4}
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
                        colorScheme="orange"
                        bg="transparent"
                        transition="background-color 0.3s ease-out"
                        fontWeight="bold"
                        fontSize="24px"
                        borderRadius="8px"
                        padding="16px 52px"
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
                    <Box>
                      <Text
                        color={"#FBFBFB"}
                        fontSize="24px"
                        lineHeight="29px"
                        fontWeight={400}
                        pt={4}
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
                        colorScheme="orange"
                        bg="transparent"
                        transition="background-color 0.3s ease-out"
                        fontWeight="bold"
                        fontSize="24px"
                        borderRadius="8px"
                        padding="16px 52px"
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

        <Container maxW={"8xl"} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
            <Stack
              spacing={6}
              justifyContent="center"
              textAlign={{ md: "left", base: "center" }}
            >
              <Text
                color={"#FFDCB1"}
                fontSize={{ base: "xl", sm: "2xl", md: "40px" }}
                fontWeight={300}
              >
                Alpha Testnet (Comming Soon)
              </Text>
              <Text
                fontWeight={300}
                lineHeight={{ md: "80px" }}
                fontSize={{ base: "5xl", md: "56px" }}
                color={"#FBFBFB"}
              >
                Trade, Win, and Share <br />
                <Text as={"span"} color={"#62E6D4"}>
                  100,000,000 ZKP
                </Text>
              </Text>
            </Stack>
            <Flex justifyContent={{ base: "center", md: "flex-start" }}>
              <Image
                alt={"feature image"}
                src="/alphatestnet.png"
                objectFit={"cover"}
                maxW={"400px"}
              />
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
                  backgroundImage="linear-gradient(93.03deg, #EBC28E -7.42%, #FFEEDA 50.62%, #EBC28E 109.79%)"
                  transition="background-color 0.3s ease-out"
                  fontWeight="bold"
                  fontSize="24px"
                  borderRadius="8px"
                  padding="16px 52px"
                  mb={{ base: 4, md: 0 }}
                  mr={{ base: 0, md: 4 }}
                  width={{ base: "100%", md: "auto" }}
                  w="180px"
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
                  colorScheme="orange"
                  bg="transparent"
                  transition="background-color 0.3s ease-out"
                  fontWeight="bold"
                  fontSize="24px"
                  borderRadius="8px"
                  padding="16px 52px"
                  width={{ base: "100%", md: "auto" }}
                  w="180px"
                >
                  <Text color={"#FBFBFB"}>Discover</Text>
                </Button>
              </NextLink>
            </Flex>
          </SimpleGrid>
        </Container>
        {/* comunity */}
        <Box>
          <Container maxW={"8xl"} py={24} position={"relative"}>
            <Box
              width={"full"}
              position={"absolute"}
              bottom={350}
              display={{ base: "none", md: "block" }}
            >
              <Image src={"./comm.png"} alt="zk perp" w="full" />
            </Box>
            <Text
              fontWeight={300}
              lineHeight={{ md: "62px" }}
              fontSize={{ base: "4xl", md: "56px" }}
              color={"#FBFBFB"}
              textAlign="center"
            >
              Join The Most United <br />
              Community In The{" "}
              <Text as={"span"} color={"#62E6D4"}>
                Ecosystem
              </Text>
            </Text>
            <Text
              textAlign="center"
              color={"#fbfbfb"}
              mt={8}
              fontSize={{ base: "xl", md: "32px" }}
            >
              zkPerp was build by Scrollers , for the Scrollers
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={24}>
              <NextLink href={"https://twitter.com/zkPerp"}>
                <Flex
                  position="relative"
                  backgroundImage="url('./Card.png') "
                  backgroundSize="cover"
                  backgroundPosition="center"
                  p={0}
                  minHeight="290px"
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
                    <Box width={"full"} py={4}>
                      <Flex
                        size="md"
                        bg="transparent"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={4}
                        px={0}
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
                        width={"100px"}
                        alignItems="center"
                        justifyContent="center"
                        pt={12}
                      >
                        <Image src={"/X.png"} alt="zk perp" w="full" />
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </NextLink>
              <NextLink href={"https://discord.com/invite/zfAjX8pmsz"}>
                <Flex
                  position="relative"
                  backgroundImage="url('./Card.png') "
                  backgroundSize="cover"
                  backgroundPosition="center"
                  p={0}
                  minHeight="290px"
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
                    <Box width={"full"} py={4}>
                      <Flex
                        size="md"
                        bg="transparent"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={4}
                        px={0}
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
                        width={"100px"}
                        alignItems="center"
                        justifyContent="center"
                        pt={12}
                      >
                        <Image src={"/Discord.png"} alt="zk perp" w="full" />
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </NextLink>
              <NextLink href={"https://t.me/zkperp"}>
                <Flex
                  position="relative"
                  backgroundImage="url('./Card.png') "
                  backgroundSize="cover"
                  backgroundPosition="center"
                  p={0}
                  minHeight="290px"
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
                    <Box width={"full"} py={4}>
                      <Flex
                        size="md"
                        bg="transparent"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={4}
                        px={0}
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
                        width={"100px"}
                        alignItems="center"
                        justifyContent="center"
                        pt={12}
                      >
                        <Image src={"/Telegram.png"} alt="zk perp" w="full" />
                      </Box>
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
