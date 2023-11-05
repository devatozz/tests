import React from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Stack,
  Link,
  useColorModeValue,
  Image,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Show,
  useMediaQuery,
  VStack,
  PopoverTrigger,
  PopoverContent,
  Text,
  Heading,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
const Popover = dynamic(
  () => import("@chakra-ui/react").then((chakra) => chakra.Popover),
  {
    ssr: false,
  }
);
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import ZkText from "../icons/ZkText";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const NAV_ITEMS = [
  {
    label: "About",
    href: "#about",
    icons: "",
  },
  {
    label: "Alpha Testnet",
    href: "https://docs.zkperp.tech/introduction/alpha-testnet",
    icons: "",
  },
  {
    label: "zkPass",
    href: "https://linktr.ee/zkperp",
    icons: "",
  },
  {
    label: "Social",
    href: "https://linktr.ee/zkperp",
    icons: "",
  },
  {
    label: "Docs",
    href: "https://docs.zkperp.tech/",
    target: "_blank",
    icons: <ExternalLinkIcon />,
  },
];

export default function AppBar() {
  const [isDesktop] = useMediaQuery("(min-width: 680px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: comingSoonOpen,
    onOpen: onComingSoonOpen,
    onClose: onComingSoonClose,
  } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Box>
      <Flex
        style={{
          backgroundImage:
            "linear-gradient(90.07deg, #EBDE8E -8.17%, #F3E4AC 7.41%, #F4E6B2 10.41%, #FFEEDA 31.13%, #FFF0DD 31.14%, #FFF2E3 36.77%, #FFFFFF 53.39%, #CBFDF6 61.33%, #93FBED 69.86%, #8AF7E8 76.91%, #62E6D4 106.87%)",
        }}
        bg={useColorModeValue("red", "gray.800")}
        color={useColorModeValue("gray.900", "red")}
        minH={"72px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 20 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        id="top"
        justifyContent={"center"}
        w="full"
        align={"center"}
      >
        <Flex
          maxW={"1200px"}
          justifyContent={"space-between"}
          w="full"
          align={"center"}
        >
          <Flex justifyContent={"center"} align={"center"}>
            <NextLink href={"/"}>
              <Flex gap={2} alignItems={"center"}>
                <Image src={"/logo.svg"} alt="zk perp" h={30} />

                <ZkText />
              </Flex>
            </NextLink>
            <Flex
              display={{
                base: "none",
                md: "flex",
              }}
              mx={24}
            >
              <Stack direction={"row"} spacing={4} justifyContent={"center"}>
                {NAV_ITEMS.map((navItem, index) => (
                  <Box key={index}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                      <PopoverTrigger>
                        {navItem.children ? (
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            pr={2}
                            py={2}
                            fontSize={"16px"}
                            fontFamily="body"
                            color="rgba(16, 16, 16, 1)"
                            _hover={{
                              textDecoration: "none",
                              color: "gray",
                            }}
                          >
                            {navItem.label}
                            {navItem.icons}
                          </Link>
                        ) : (
                          <NextLink href={navItem.href} passHref target="self_">
                            <Text
                              pr={2}
                              fontSize={"16px"}
                              fontFamily="body"
                              textAlign="center"
                              color="rgba(16, 16, 16, 1)"
                              _hover={{
                                textDecoration: "none",
                                color: "gray",
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {navItem.label}
                              <Text
                                position={"relative"}
                                top={0}
                                style={{
                                  marginLeft: "10px",
                                  fontSize: "16px",
                                }}
                              >
                                {navItem.icons}
                              </Text>
                            </Text>
                          </NextLink>
                        )}
                      </PopoverTrigger>
                      {navItem.children && (
                        <PopoverContent
                          border={0}
                          boxShadow={"xl"}
                          p={4}
                          rounded={"xl"}
                          width={"xs"}
                        >
                          <Stack>
                            {navItem.children.map((child) => (
                              <DesktopSuvNav key={child.label} {...child} />
                            ))}
                          </Stack>
                        </PopoverContent>
                      )}
                    </Popover>
                  </Box>
                ))}
              </Stack>
            </Flex>
          </Flex>

          {isDesktop && (
            // <NextLink href={"#"}>
            <Button
              backgroundColor={"#101010"}
              transition="background-color 0.3s ease-in-out"
              _hover={{
                bg: "linear-gradient(93.03deg, #101010 -7.42%, #5B5B5B 50.62%, #101010 109.79%)",
              }}
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "8px",
                padding: "16px 32px",
                fontFamily: "body",
              }}
              onClick={onComingSoonOpen}
            >
              <Text color={"#FFEEDA"}>Launch App</Text>
            </Button>
            // </NextLink>
          )}
          <ComingSoonModal
            isOpen={comingSoonOpen}
            onClose={onComingSoonClose}
          />
          {!isDesktop && (
            <Button
              ref={btnRef}
              bg="none"
              color="rgba(16, 16, 16, 1)"
              onClick={onOpen}
            >
              <HamburgerIcon fontSize={"32px"} />
            </Button>
          )}
        </Flex>
      </Flex>

      {!isDesktop && (
        <>
          <Drawer
            isOpen={isOpen}
            placement="top"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton size="lg" />
              <DrawerHeader
                style={{
                  backgroundImage:
                    "linear-gradient(90.07deg, #EBDE8E -8.17%, #F3E4AC 7.41%, #F4E6B2 10.41%, #FFEEDA 31.13%, #FFF0DD 31.14%, #FFF2E3 36.77%, #FFFFFF 53.39%, #CBFDF6 61.33%, #93FBED 69.86%, #8AF7E8 76.91%, #62E6D4 106.87%)",
                }}
              >
                <NextLink href={"/"}>
                  <Flex gap={2} alignItems={"center"} w="full" h="full">
                    <Image src={"/zkperplogo.svg"} alt="zk perp" h={30} />
                    <ZkText />
                  </Flex>
                </NextLink>
              </DrawerHeader>
              <DrawerBody
                position="relative"
                backgroundImage="url('./Card.png') "
                backgroundSize="cover"
                backgroundPosition="center"
                p={0}
              >
                <VStack
                  w="full"
                  direction={"row"}
                  spacing={4}
                  alignItems="left"
                  bgGradient="radial-gradient(114% 180.27% at -6.44% -7.16%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)"
                  backgroundBlendMode="overlay"
                  px={8}
                  pt={8}
                  pb={4}
                >
                  {NAV_ITEMS.map((navItem, index) => (
                    <Box key={index}>
                      {navItem.children ? (
                        <Popover trigger={"hover"} placement={"bottom-start"}>
                          <PopoverTrigger>
                            <Link
                              pr={2}
                              py={2}
                              fontSize={"base"}
                              fontFamily="body"
                              fontWeight={700}
                              color="white"
                              _hover={{
                                textDecoration: "none",
                                color: "gray",
                              }}
                            >
                              {navItem.label}
                            </Link>
                          </PopoverTrigger>
                          <PopoverContent
                            border={0}
                            boxShadow={"xl"}
                            // p={4}
                            rounded={"xl"}
                            width={"max-content"}
                          >
                            <Stack>
                              {navItem.children.map((child) => (
                                <DesktopSuvNav key={child.label} {...child} />
                              ))}
                            </Stack>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Link href={navItem.href}>
                          <Text
                            pr={2}
                            fontSize={"16px"}
                            fontFamily="body"
                            color="#fbfbfb"
                            _hover={{
                              textDecoration: "none",
                              color: "gray",
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            {navItem.label}
                            <Text
                              position={"relative"}
                              top={0}
                              style={{
                                marginLeft: "10px",
                                fontSize: "16px",
                              }}
                            >
                              {navItem.icons}
                            </Text>
                          </Text>
                        </Link>
                      )}
                    </Box>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Box>
  );
}

const DesktopSuvNav = ({ label, href }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Box
        // as="a"
        href={href}
        role="group"
        display={"block"}
        p={2}
        rounded={"md"}
        cursor={"pointer"}
        _hover={{ bg: "#212B6B ", color: "white " }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all 0.3s ease"}
              fontWeight={200}
              fontFamily="body"
            >
              {label}
            </Text>
          </Box>
        </Stack>
      </Box>
    </a>
  );
};
const ComingSoonModal = ({ isOpen, onClose }) => (
  <Modal
    blockScrollOnMount={false}
    isOpen={isOpen}
    onClose={onClose}
    size={{ base: "sm", md: "xl" }}
    alignItems={"center"}
  >
    <ModalOverlay />
    <ModalContent motion="slideInBottom" alignContent="center">
      <ModalHeader
        sx={{
          fontSize: "34px",
          // fontWeight: "300",
          borderRadius: "10px",

          backgroundImage:
            "linear-gradient(90.07deg, #EBDE8E -8.17%, #F3E4AC 7.41%, #F4E6B2 10.41%, #FFEEDA 31.13%, #FFF0DD 31.14%, #FFF2E3 36.77%, #FFFFFF 53.39%, #CBFDF6 61.33%, #93FBED 69.86%, #8AF7E8 76.91%, #62E6D4 106.87%)",

          lineHeight: "44px",
          "@media(max-width: 768px)": {
            fontSize: "28px",
          },
        }}
      >
        <Heading>Launch App</Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody
        sx={{
          backgroundColor: "#fbfbfb",
          borderRadius: "10px",
        }}
      >
        <CommingSoonModalText />
      </ModalBody>
    </ModalContent>
  </Modal>
);
export const CommingSoonModalText = () => {
  return (
    <>
      <Text
        fontFamily="body"
        fontSize={{ md: "24px", base: "18px" }}
        color="#101010"
        padding={"20px 0px"}
        textAlign={"Center"}
      >
        Comming Soon!
      </Text>
    </>
  );
};
