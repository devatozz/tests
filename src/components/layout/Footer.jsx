import React, { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function LargeWithLogoLeft() {
  const [imageXSrc, setImageXSrc] = useState("./asset/img/x.svg");
  const [imageTeleSrc, setImageTeleSrc] = useState("./asset/img/tele.svg");
  const [imageInSrc, setImageInSrc] = useState("./asset/img/in.svg");

  return (
    <Box
      bg="#000"

      // minHeight: "100vh",
    >
      <Container
        as={Stack}
        maxW={"90%"}
        maxHeight={{ md: "400px", base: "auto" }}
        color={"#fff"}
        borderTop={"2px solid gray "}
      >
        <SimpleGrid
          templateColumns={{ sm: " 1fr 1fr 1fr", md: " 2fr 1fr 2fr" }}
          spacing={8}
          py={{ md: "60px", base: "40px" }}
          px={{ base: "15px" }}
        >
          <Stack spacing={2}>
            <NextLink href={"/"}>
              <Flex gap={"15px"} alignItems={"center"} minWidth={"28px"}>
                <Image src="./asset/img/logo.png" alt="m33m" height={"28px"} />
              </Flex>
            </NextLink>
            <Text
              color={"#fff"}
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight={{ base: "300", md: "400" }}
              lineHeight={{ base: "19px", md: "22px" }}
              fontFamily="Anta"
              fontStyle={"normal"}
              paddingTop={{ md: "20px", base: "10px" }}
            >
              Your trusted Blockchain service provider
            </Text>
            <Text
              color={"#fff"}
              fontSize={{ base: "14px", md: "20px" }}
              fontWeight={{ base: "300", md: "300" }}
              lineHeight={{ base: "19px", md: "26px" }}
              opacity={"0.64"}
              fontFamily="Anta"
              fontStyle={"normal"}
              paddingTop={{ md: "20px", base: "10px" }}
            >
              © 2024 M33M LABS. All rights reserved.
            </Text>
          </Stack>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={{ md: "center", base: "space-center" }}
          >
            <SimpleGrid
              fontSize={{ base: "16px", md: "24px" }}
              lineHeight={{ base: "24px", md: "29px" }}
              columns={{ base: 3, sm: 3, md: 3 }}
              spacing={1}
              width={{ md: "100%", base: "100%" }}
              textAlign={"center"}
            >
              <NextLink href={"https://twitter.com/m33mlabs"} target="_blank">
                <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
                  <Box
                    as="span"
                    cursor="pointer"
                    onMouseEnter={() => setImageXSrc("./asset/img/x2.svg")}
                    onMouseLeave={() => setImageXSrc("./asset/img/x.svg")}
                    transition="0.2s ease-in-out"
                  >
                    <Image
                      src={imageXSrc}
                      alt="Icons"
                      height={"38px"}
                      width={"38px"}
                    />
                  </Box>
                </Flex>
              </NextLink>
              <NextLink href={"https://t.me/frankiem33m"} target="_blank">
                <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
                  <Box
                    as="span"
                    cursor="pointer"
                    onMouseEnter={() =>
                      setImageTeleSrc("./asset/img/tele2.svg")
                    }
                    onMouseLeave={() => setImageTeleSrc("./asset/img/tele.svg")}
                    transition="0.2s ease-in-out"
                  >
                    <Image
                      src={imageTeleSrc}
                      alt="Icons"
                      height={"38px"}
                      width={"38px"}
                    />
                  </Box>
                </Flex>
              </NextLink>

              <NextLink
                href={"https://www.linkedin.com/company/m33m/"}
                target="_blank"
              >
                <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
                  <Box
                    as="span"
                    cursor="pointer"
                    onMouseEnter={() => setImageInSrc("./asset/img/in2.svg")}
                    onMouseLeave={() => setImageInSrc("./asset/img/in.svg")}
                    transition="0.2s ease-in-out"
                  >
                    <Image
                      src={imageInSrc}
                      alt="Icons"
                      height={"38px"}
                      width={"38px"}
                    />
                  </Box>
                </Flex>
              </NextLink>
            </SimpleGrid>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-around"}
            flexDirection={"row"}
          >
            <Box
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <NextLink href={"/service"}>
                <Text
                  color={"#fff"}
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight={{ base: "300", md: "400" }}
                  lineHeight={{ base: "19px", md: "22px" }}
                  fontFamily="Anta"
                  fontStyle={"normal"}
                  // paddingTop={{ md: "20px", base: "10px" }}
                >
                  SERVICES
                </Text>
              </NextLink>
              <NextLink href={"/careers"}>
                <Text
                  color={"#fff"}
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight={{ base: "300", md: "400" }}
                  lineHeight={{ base: "19px", md: "22px" }}
                  fontFamily="Anta"
                  fontStyle={"normal"}
                  paddingTop={{ md: "60px", base: "10px" }}
                >
                  CAREERS
                </Text>
              </NextLink>
            </Box>
            <Box
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"space-around"}
              flexDirection={"column"}
            >
              <NextLink href={"/portfolio"}>
                <Text
                  color={"#fff"}
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight={{ base: "300", md: "400" }}
                  lineHeight={{ base: "19px", md: "22px" }}
                  fontFamily="Anta"
                  fontStyle={"normal"}
                >
                  PORTFOLIO
                </Text>
              </NextLink>
              <NextLink href={"https://linktr.ee/m33mlabs"} target="_blank">
                <Text
                  color={"#fff"}
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight={{ base: "300", md: "400" }}
                  lineHeight={{ base: "19px", md: "22px" }}
                  fontFamily="Anta"
                  fontStyle={"normal"}
                  paddingTop={{ md: "60px", base: "10px" }}
                  textAlign={"left"}
                >
                  LINKS
                </Text>
              </NextLink>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
