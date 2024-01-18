import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Image,
  useColorModeValue,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function LargeWithLogoLeft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      color={useColorModeValue("gray.700", "gray.200")}
      bg="#21281a"

      // minHeight: "100vh",
    >
      <Container
        as={Stack}
        maxW={"1440px"}
        w="full"
        maxHeight={{ md: "400px", base: "auto" }}
        color={"#101010"}
      >
        <SimpleGrid
          templateColumns={{ sm: " 1fr 1fr", md: " 1fr 1fr" }}
          spacing={8}
          py={{ md: "60px", base: "40px" }}
          px={{ base: "15px" }}
        >
          <Stack spacing={2}>
            <NextLink href={"/"}>
              <Box>
                <Flex gap={2} alignItems={"center"} w="full" h="full">
                  <Image src={"/blast/logo.png"} alt="blast" height="40px" />
                </Flex>
              </Box>
            </NextLink>
            <Text
              color={"#C3D3A5"}
              fontSize={{ base: "16px", md: "26px" }}
              fontWeight={{ base: "300", md: "600" }}
              lineHeight={{ base: "19px", md: "26px" }}
              fontFamily="Lakes"
              fontStyle={"normal"}
              paddingTop={{ md: "20px", base: "10px" }}
            >
              The Perpetual DEX with Native Yield
            </Text>
          </Stack>
          <Box
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={{ md: "flex-end", base: "space-center" }}
          >
            <SimpleGrid
              fontSize={{ base: "16px", md: "24px" }}
              lineHeight={{ base: "24px", md: "29px" }}
              columns={{ base: 5, sm: 5, md: 5 }}
              spacing={2}
              width={{ md: "70%", base: "100%" }}
            >
              <NextLink href={"/"} target="_blank">
                <Flex gap={2} alignItems={"center"}>
                  <Image
                    src={"/blast/sol-docs.png"}
                    alt="blasttrade"
                    height={"38px"}
                  />
                </Flex>
              </NextLink>
              <NextLink href={"/"} target="_blank">
                <Flex gap={2} alignItems={"center"}>
                  <Image
                    src={"/blast/sol-tw.png"}
                    alt="blasttrade"
                    height={"38px"}
                  />
                </Flex>
              </NextLink>
              <NextLink href={"/"} target="_blank">
                <Flex gap={2} alignItems={"center"}>
                  <Image
                    src={"/blast/sol-discord.png"}
                    alt="blasttrade"
                    height={"38px"}
                  />
                </Flex>
              </NextLink>
              <NextLink href={"/"} target="_blank">
                <Flex gap={2} alignItems={"center"}>
                  <Image
                    src={"/blast/sol-tele.png"}
                    alt="blasttrade"
                    height={"38px"}
                  />
                </Flex>
              </NextLink>
              <NextLink href={"/"} target="_blank">
                <Flex gap={2} alignItems={"center"}>
                  <Image
                    src={"/blast/sol-5.png"}
                    alt="blasttrade"
                    height={"38px"}
                  />
                </Flex>
              </NextLink>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
