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

export const TermOfUse = () => {
  return (
    <>
      <Text
        fontFamily="body"
        fontSize={{ md: "24px", base: "18px" }}
        color="#fbfbfb"
      >
        1. MODIFICATIONS TO THESE TERMS
      </Text>
      <br />
      <Text
        fontSize={{ md: "24px", base: "18px" }}
        fontFamily="body"
        color="#fbfbfb"
      >
        Vertex reserves the right, in its sole discretion, to modify these Terms
        from time to time. If Vertex makes changes, Vertex will provide you with
        notice of such changes, such as by providing notice through the Services
        or updating the “Last Updated” date at the top of these Terms. Unless
        Vertex states otherwise in a notice, all such modifications are
        effective immediately, and your continued use of the Site and the
        Services after Vertex provides that notice will confirm your acceptance
        of the changes. If you do not agree to the amended Terms, then you must
        stop using the Site and the Services.
      </Text>
      <br />
      <Text
        fontFamily="body"
        fontSize={{ md: "24px", base: "18px" }}
        color="#fbfbfb"
      >
        2. USE OF SERVICES
      </Text>
      <br />
      <Text
        fontFamily="body"
        fontSize={{ md: "24px", base: "18px" }}
        color="#fbfbfb"
      >
        2.1. As a condition to accessing or using the Services or the Site, you
        represent and warrant to Vertex the following: <br /> <br />
        if you are entering into these Terms as an individual, then you are of
        legal age in the jurisdiction in which you reside and you have the legal
        capacity to enter into these Terms and be bound by them; <br /> <br />{" "}
        if you are entering into these Terms as an entity, then you must have
        the legal authority to accept these Terms on that entity’s behalf, in
        which case “you” (except as used in this paragraph) will mean that
        entity;
      </Text>
      <br />
    </>
  );
};

export default function LargeWithLogoLeft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      style={{
        backgroundImage:
          "linear-gradient(90.07deg, #EBDE8E -8.17%, #F3E4AC 7.41%, #F4E6B2 10.41%, #FFEEDA 31.13%, #FFF0DD 31.14%, #FFF2E3 36.77%, #FFFFFF 53.39%, #CBFDF6 61.33%, #93FBED 69.86%, #8AF7E8 76.91%, #62E6D4 106.87%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // minHeight: "100vh",
      }}
    >
      <Container
        as={Stack}
        maxW={"1440px"}
        w="full"
        maxHeight={{ md: "400px", base: "auto" }}
      >
        <SimpleGrid
          templateColumns={{ sm: " 1fr 1fr", md: " 1fr 1fr" }}
          spacing={8}
          py={{ md: "60px", base: "40px" }}
        >
          <Stack spacing={6}>
            <Box>
              <Flex gap={2} alignItems={"center"} w="full" h="full">
                <Image
                  src={"/logo.svg"}
                  alt="zk perp"
                  width={{ md: "40px", base: "28px" }}
                />
                <Text
                  fontSize={{ base: "24px", md: "36px" }}
                  fontWeight={500}
                  fontFamily="logo"
                >
                  zkPerp
                </Text>
              </Flex>
            </Box>
            <Text
              fontFamily="body"
              fontSize={{ base: "16px", md: "24px" }}
              lineHeight={{ base: "24px", md: "29px" }}
            >
              ©2023 zkPerp Inc. All rights reserved <br />
              contact@zkperp.tech
            </Text>
          </Stack>
          <Box align="center" display={{ md: "none", base: "block" }}>
            <Image
              alt={"Line image"}
              src="/lineblack.png"
              objectFit={"cover"}
            />
          </Box>
          <SimpleGrid
            fontSize={{ base: "16px", md: "24px" }}
            lineHeight={{ base: "24px", md: "29px" }}
            columns={{ base: 2, sm: 2, md: 3 }}
            spacing={8}
          >
            <Stack align={"flex-start"} spacing={3}>
              <NextLink
                target="self_"
                href={"https://twitter.com/zkPerp"}
                className="link"
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  X
                </Text>
              </NextLink>
              <NextLink
                href={"https://discord.com/invite/zfAjX8pmsz"}
                className="link"
                target="self_"
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Discord
                </Text>
              </NextLink>
              <NextLink
                target="self_"
                href={"https://t.me/zkperp"}
                className="link"
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Telegram
                </Text>
              </NextLink>
              <NextLink
                href={"https://mirror.xyz/zkperptech.eth"}
                className="link"
                target="_blank"
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Blog
                </Text>
              </NextLink>
            </Stack>
            <Stack align={"flex-start"} spacing={3}>
              <NextLink target="self_" href={"#"}>
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Trade
                </Text>
              </NextLink>
              <NextLink target="self_" href={"#"}>
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Faucet
                </Text>
              </NextLink>
              <NextLink target="self_" href={"#"}>
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Add liquidity
                </Text>
              </NextLink>
              <NextLink target="self_" href={"#"}>
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Alpha Tesnet
                </Text>
              </NextLink>
            </Stack>
            <Stack align={"flex-start"} spacing={3}>
              <NextLink
                target="_blank"
                href={"https://docs.zkperp.tech/introduction/welcome"}
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Docs
                </Text>
              </NextLink>
              {/* <Box>
                /* Trigger the modal 
                <Text
                  onClick={onOpen}
                  fontFamily="body"
                  cursor={"pointer"}
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Term of Use
                </Text>
              </Box> */}
              <NextLink
                target="_blank"
                href={"https://docs.zkperp.tech/introduction/welcome"}
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Term of Use
                </Text>
              </NextLink>
              <NextLink
                target="_blank"
                href={"https://docs.zkperp.tech/introduction/welcome"}
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Privacy Policy
                </Text>
              </NextLink>
              <NextLink
                target="_blank"
                href={"https://docs.zkperp.tech/introduction/welcome"}
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: "16px", md: "24px" }}
                  lineHeight={{ base: "24px", md: "29px" }}
                >
                  Media Kit
                </Text>
              </NextLink>
            </Stack>
          </SimpleGrid>
        </SimpleGrid>
      </Container>
      {/* Render the modal */}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent motion="slideInBottom" alignContent="flex-end">
          <ModalHeader
            sx={{
              fontSize: "34px",
              // fontWeight: "300",
              backgroundColor: "#93FBED",
              lineHeight: "44px",
              "@media(max-width: 768px)": {
                fontSize: "28px",
              },
            }}
          >
            <Heading>Terms of Service</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            sx={{
              backgroundColor: "#101010",
            }}
          >
            {/* Render the component */}
            <TermOfUse />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
