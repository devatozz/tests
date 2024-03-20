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
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

const NAV_ITEMS = [
  // {
  //   label: "App",
  //   href: "",
  //   icons: "",
  //   target: "",
  //   active: false,
  // },
  {
    label: "NFT",
    href: "",
    target: "",
    icons: "",
    active: false,
  },
  {
    label: "Airdrop",
    href: "/airdrop",
    target: "",
    icons: "",
    active: false,
  },
  {
    label: "Docs",
    href: "https://docs.blasttrade.org/",
    target: "_blank",
    icons: "",
    active: true,
  },
  {
    label: "Community",
    href: "https://linktr.ee/blasttrade",
    icons: "",
    target: "_blank",
    active: true,
  },
];

export default function AppBar() {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
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
        bg="linear-gradient(180deg, #12140D 0%, #15170E 51.04%, #22281A 100%);"
        color={useColorModeValue("#fff.900", "red")}
        minH={"72px"}
        paddingX={{ base: 4, md: 12, xl: 0 }}
        paddingY={{ base: "18px", md: "10px" }}
        id="top"
        justifyContent={"center"}
        w="full"
        align={"center"}
      >
        <Flex
          // maxW={"1200px"}
          justifyContent={"space-between"}
          px={{ lg: "10px", xl: 0 }}
          w={{ base: "full", xl: "90%" }}
          align={"center"}
        >
          <Flex justifyContent={"flex-start"}>
            {!isDesktop && (
              <Button ref={btnRef} bg="none" color="#FCFDC7" onClick={onOpen}>
                <HamburgerIcon fontSize={"32px"} />
              </Button>
            )}
            <Flex justifyContent={"center"} align={"center"}>
              <NextLink href={"/"}>
                <Flex gap={"15px"} alignItems={"center"} minWidth={"42px"}>
                  <Image
                    src={
                      "https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/logoApp.svg"
                    }
                    alt="blasttrade"
                    height={"42px"}
                  />
                  <Box display={{ base: "none", xl: "block" }}>
                    <img src="https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/home/logo.svg" />
                  </Box>
                </Flex>
              </NextLink>

              <Flex
                display={{
                  base: "none",
                  md: "flex",
                }}
                mx={{ md: 10, lg: 24 }}
              >
                <Stack
                  direction={"row"}
                  spacing={{ base: "30px", md: "20px", xl: "40px" }}
                  justifyContent={"center"}
                >
                  {NAV_ITEMS.map((navItem, index) => (
                    <Box key={index}>
                      <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                          {navItem.children ? (
                            <Link
                              target={navItem.target}
                              rel="noopener noreferrer"
                              pr={2}
                              py={2}
                              fontSize={"16px"}
                              fontFamily="body"
                              color={navItem.active ? "#FCFDC7" : "gray"}
                              cursor={
                                navItem.active ? "pointer" : "not-allowed"
                              }
                              _hover={{
                                textDecoration: "none",
                                color: "#fff",
                              }}
                            >
                              {navItem.label}
                            </Link>
                          ) : (
                            <NextLink
                              href={navItem.href}
                              passHref
                              target={navItem.target}
                            >
                              <Text
                                pr={2}
                                fontSize={"16px"}
                                fontFamily="Lakes"
                                textAlign="center"
                                color={navItem.active ? "#FCFDC7" : "gray"}
                                cursor={
                                  navItem.active ? "pointer" : "not-allowed"
                                }
                                _hover={{
                                  textDecoration: "none",
                                  color: "#fff",
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "600",
                                }}
                              >
                                {navItem.label}
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
          </Flex>

          <Flex gap={"14px"}>
            {/* <NextLink href={""} target="self_"> */}{" "}
            <Tooltip label="Coming soon" aria-label="A tooltip">
              <Button
                backgroundColor={"#FCFC05"}
                transition="background-color 0.3s ease-in-out"
                _hover={{
                  bg: "#fff",
                }}
                style={{
                  borderRadius: "4px",
                }}
                padding={{ base: "7px 14px", md: "16px 32px" }}
                height={{ base: "30px", md: "45px" }}
                // onClick={onComingSoonOpen}
              >
                <Text
                  fontFamily={"Lakes"}
                  color={"black"}
                  fontWeight={"700"}
                  fontSize={{ base: "12px", md: "16px" }}
                >
                  Launch App
                </Text>
              </Button>
            </Tooltip>
            {/* </NextLink> */}
            {/* <Box
              display={{ base: "block", md: "none" }}
              border={"1px solid #fcfdc773"}
              borderRadius={"3.5px"}
              p={"7px"}
              h={30}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.9994 14.1228C11.3807 14.1228 14.1219 11.3817 14.1219 8.00038C14.1219 4.61904 11.3807 1.87793 7.9994 1.87793C4.61807 1.87793 1.87695 4.61904 1.87695 8.00038C1.87695 11.3817 4.61807 14.1228 7.9994 14.1228Z"
                  stroke="#FCFC05"
                  strokeWidth="0.918367"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.54976 2.49023H6.16201C4.96813 6.06574 4.96813 9.93513 6.16201 13.5106H5.54976"
                  stroke="#FCFC05"
                  strokeWidth="0.918367"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.83594 2.49023C11.0298 6.06574 11.0298 9.93513 9.83594 13.5106"
                  stroke="#FCFC05"
                  strokeWidth="0.918367"
                  strokeLinecap="round"
                  // MorestrokeLinejoin="round"
                />
                <path
                  d="M2.48926 10.4492V9.83691C6.06477 11.0308 9.93416 11.0308 13.5097 9.83691V10.4492"
                  stroke="#FCFC05"
                  strokeWidth="0.918367"
                  strokeLinecap="round"
                  // MorestrokeLinejoin="round"
                />
                <path
                  d="M2.48926 6.16396C6.06477 4.97009 9.93416 4.97009 13.5097 6.16396"
                  stroke="#FCFC05"
                  strokeWidth="0.918367"
                  strokeLinecap="round"
                  // MorestrokeLinejoin="round"
                />
              </svg>
            </Box> */}
          </Flex>
          {/* <ComingSoonModal
            isOpen={comingSoonOpen}
            onClose={onComingSoonClose}
          /> */}
        </Flex>
      </Flex>

      {!isDesktop && (
        <>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent
              width={"90%"}
              backgroundImage={
                "url('https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/menu-drawer-mobile.png')"
              }
              backgroundSize={"cover"}
            >
              <DrawerCloseButton mt={"9px"} size="base" color={"#FCFDC7"} />
              <DrawerHeader>
                <NextLink href={"/"}>
                  <Flex gap={2} alignItems={"center"} w="full" h="full">
                    <Image
                      src={
                        "https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/logo.png"
                      }
                      alt="blast trade"
                      h={18}
                    />
                  </Flex>
                </NextLink>
              </DrawerHeader>

              <DrawerBody position="relative" p={0}>
                <VStack
                  w="full"
                  direction={"row"}
                  spacing={4}
                  alignItems="left"
                  backgroundBlendMode="overlay"
                  px={8}
                  pt={"40px"}
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
                              color={navItem.active ? "#FCFDC7" : "gray"}
                              cursor={
                                navItem.active ? "pointer" : "not-allowed"
                              }
                              _hover={{
                                textDecoration: "none",
                                color: "#fff",
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
                            color={navItem.active ? "#FCFDC7" : "gray"}
                            cursor={navItem.active ? "pointer" : "not-allowed"}
                            _hover={{
                              textDecoration: "none",
                              color: "#fff",
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              fontWeight: "500",
                            }}
                          >
                            {navItem.label}
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
          // borderRadius: "10px",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(90.07deg, #EBDE8E -8.17%, #F3E4AC 7.41%, #F4E6B2 10.41%, #FFEEDA 31.13%, #FFF0DD 31.14%, #FFF2E3 36.77%, #FFFFFF 53.39%, #CBFDF6 61.33%, #93FBED 69.86%, #8AF7E8 76.91%, #62E6D4 106.87%)",

          lineHeight: "44px",
          "@media(max-width: 768px)": {
            fontSize: "28px",
          },
        }}
      >
        <Heading color={"fbfbfb"}>Launch App</Heading>
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
