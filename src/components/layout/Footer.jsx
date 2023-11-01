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
} from "@chakra-ui/react";
import NextLink from "next/link";

export const TermOfUse = () => {
  return (
    <>
      <Text color="#fbfbfb">1. MODIFICATIONS TO THESE TERMS</Text>
      <br />
      <Text color="#fbfbfb">
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
      <Text color="#fbfbfb">2. USE OF SERVICES</Text>
      <br />
      <Text color="#fbfbfb">
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
      <Container as={Stack} maxW={"8xl"} py={10} w="full">
        <SimpleGrid
          templateColumns={{ sm: " 1fr 1fr", md: " 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Flex gap={2} alignItems={"center"} w="full" h="full">
                <Image src={"/zkperplogo.svg"} alt="zk perp" h={30} />
                <Text fontSize={{ base: "3xl", md: 32 }} fontWeight={600}>
                  zkPerp
                </Text>
              </Flex>
            </Box>
            <Text fontSize={{ base: "xl", md: "24px" }}>
              ©2023 zkPerp Inc. All rights reserved
            </Text>
            <Text fontSize={{ base: "xl", md: "24px" }}>
              contact@zkperp.tech
            </Text>
          </Stack>

          <SimpleGrid
            fontSize={{ base: "xl", md: "24px" }}
            columns={{ base: 2, sm: 2, md: 3 }}
            spacing={8}
          >
            <Stack align={"flex-start"} spacing={3}>
              <NextLink href={"https://twitter.com/zkPerp"} className="link">
                <Box>X</Box>
              </NextLink>
              <NextLink
                href={"https://discord.com/invite/zfAjX8pmsz"}
                className="link"
              >
                <Box>Discord</Box>
              </NextLink>
              <NextLink href={"https://t.me/zkperp"} className="link">
                <Box>Telegram</Box>
              </NextLink>
              <NextLink
                href={"https://mirror.xyz/zkperptech.eth"}
                className="link"
              >
                <Box>Blog</Box>
              </NextLink>
            </Stack>
            <Stack align={"flex-start"} spacing={3}>
              <NextLink href={"#"}>
                <Box>Trade</Box>
              </NextLink>
              <NextLink href={"#"}>
                <Box>Faucet</Box>
              </NextLink>
              <NextLink href={"#"}>
                <Box>Add Liquidity</Box>
              </NextLink>
              <NextLink href={"#"}>
                <Box>Alpha Testnet</Box>
              </NextLink>
            </Stack>
            <Stack align={"flex-start"} spacing={3}>
              <NextLink href={"#"}>
                <Box>Docs</Box>
              </NextLink>
              <Box>
                {/* Trigger the modal */}
                <Text onClick={onOpen}>Term of Use</Text>
              </Box>
              <NextLink href={"#"}>
                <Box>Privacy Policy</Box>
              </NextLink>
              <NextLink href={"#"}>
                <Box>Media Kit</Box>
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
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent motion="slideInBottom" alignContent="flex-end">
          <ModalHeader
            sx={{
              fontSize: "40px",
              fontWeight: "300",
              backgroundColor: "#93FBED",
              lineHeight: "44px",
              "@media(max-width: 768px)": {
                fontSize: "32px",
              },
            }}
          >
            Terms of Service
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
