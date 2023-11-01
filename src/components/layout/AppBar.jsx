import React from "react";
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
  Popover,
  Text,
} from "@chakra-ui/react";

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
    href: "#alphatestnet",
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
        justifyContent={"space-between"}
        w="full"
        align={"center"}
        id="top"
      >
        <NextLink href={"/"}>
          <Flex gap={2} alignItems={"center"}>
            <Image src={"/zkperplogo.svg"} alt="zk perp" h={30} />

            <ZkText />
          </Flex>
        </NextLink>
        <Flex
          display={{
            base: "none",
            md: "flex",
          }}
        >
          <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem, index) => (
              <Box key={index}>
                <Popover trigger={"hover"} placement={"bottom-start"}>
                  <PopoverTrigger>
                    {navItem.children ? (
                      <Link
                        pr={2}
                        py={2}
                        fontSize={"24px"}
                        color="rgba(16, 16, 16, 1)"
                        _hover={{
                          textDecoration: "none",
                          color: "gray",
                        }}
                        isExternal={
                          navItem.label === "Whitepaper" ? true : false
                        }
                      >
                        {navItem.label}
                        {navItem.icons}
                      </Link>
                    ) : (
                      <NextLink href={navItem.href} passHref>
                        <Text
                          pr={2}
                          fontSize={"24px"}
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
                          <span
                            style={{
                              marginLeft: "5px",
                              fontSize: "24px",
                              paddingBottom: "5px",
                            }}
                          >
                            {navItem.icons}
                          </span>
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

        {isDesktop && (
          <Button
            size="md"
            color="#FBFBFB"
            backgroundImage="linear-gradient(93.03deg, #101010 -7.42%, #5B5B5B 50.62%, #101010 109.79%)"
            transition="background-color 0.3s ease-out"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "8px",
              padding: "16px 32px",
            }}
          >
            Launch App
          </Button>
        )}
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
                        <Link
                          href={navItem.href}
                          pr={2}
                          py={2}
                          fontSize={"base"}
                          fontWeight={700}
                          color="white"
                          _hover={{
                            textDecoration: "none",
                            color: "gray",
                          }}
                        >
                          {navItem.label}
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
            <Text transition={"all 0.3s ease"} fontWeight={200}>
              {label}
            </Text>
          </Box>
        </Stack>
      </Box>
    </a>
  );
};
