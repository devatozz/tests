import React, { useState } from "react";
import { Tooltip } from "@chakra-ui/react";
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
import { ChevronUpIcon } from "@chakra-ui/icons";
import { Link, animateScroll as scroll } from "react-scroll";
import NextLink from "next/link";
export default function Banner() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      m={0}
      w={"100%"}
      p={0}
      minHeight="calc(100vh - 72px)"
      bg={"transparent"}
    >
      {/* hero view  */}
      <Flex
        alignItems={"center"}
        position={"relative"}
        p={{ base: "40px 0", md: "0px 0" }}
        justifyContent={"center"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
      >
        <Container
          maxW={"90%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={{ md: "flex-start", base: "center" }}
          flexDirection={{ md: "row", base: "column-reverse" }}
        >
          <Stack
            as={Box}
            spacing={{ base: "20px", md: 12 }}
            py={{ md: 12, lg: 16 }}
          >
            <Box align={"center"}>
              <Heading
                fontWeight={400}
                fontSize={{
                  base: "28px",
                  md: "46px",
                  xl: "64px",
                  "2xl": "96px",
                }}
                lineHeight={{
                  base: "32px",
                  md: "60px",
                  xl: "80px",
                  "2xl": "120px",
                }}
                color={"#fff"}
                textAlign={{ md: "left", base: "left" }}
              >
                BUILD THE BEST <br />{" "}
                <span style={{ color: "#0068FF" }}> DEFI PROTOCOLS</span> <br />{" "}
                WITH M33M LABS
              </Heading>
            </Box>

            <Box align={"center"}>
              <Text
                color={"#fff"}
                fontSize={{ base: "15px", xl: "20px", "2xl": "22px" }}
                lineHeight={{ base: "24pxpx", xl: "28pxpx", "2xl": "40px" }}
                fontFamily="Anta"
                maxW={{ md: "817", base: "100%" }}
                textAlign={{ md: "left", base: "left" }}
                fontWeight={{ base: 500, md: 600 }}
              >
                We build and experiment world class products in crypto space
                that will definitely blow your mind with abnormal DeFi models.
              </Text>
            </Box>

            <Flex
              align={{ md: "center" }}
              justify={{ md: "center", base: "flex-start" }}
              pt={{ md: 8 }}
              width={"100%"}
              gap={{ md: 30, base: 15 }}
              flexDirection={{ md: "row", base: "column" }}
            >
              <Box width={"100%"}>
                <a
                  href="mailto:team@m33m.io"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    CONTACT US
                  </Button>
                </a>
              </Box>
              <Box width={"100%"}>
                <NextLink href={"/service"}>
                  <Button
                    backgroundColor={"transparent"}
                    transition="background-color 0.3s ease-in-out"
                    borderRadius={"0px"}
                    width={"100%"}
                    border="1px solid #fff"
                    color={"#fff"}
                    _hover={{
                      bg: "#fff",
                      color: "#000",
                      border: "1px solid transparent",
                    }}
                    style={{
                      padding: "5px 32px",
                      fontFamily: "Anta",
                      fontWeight: "400",
                    }}
                    fontSize={{ base: "11px", md: "20px" }}
                    height={{ base: "30px", md: "56px" }}
                  >
                    SERVICES
                  </Button>
                </NextLink>
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Flex>
      <ScrollToTopButton />
    </Box>
  );
}
export const ScrollToTopButton = () => {
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
        borderRadius="8px"
        cursor="pointer"
      >
        <ChevronUpIcon boxSize={{ md: "8", base: "6" }} color={"#fff"} />
      </Box>
    </Link>
  );
};
