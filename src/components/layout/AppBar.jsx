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
import { useRouter } from "next/router";
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
  {
    label: "ABOUT",
    href: "/about",
    target: "",
    icons: "",
    active: true,
  },
  {
    label: "SERVICES",
    href: "/service",
    target: "",
    icons: "",
    active: true,
  },
  {
    label: "PORTFOLIO",
    href: "/portfolio",
    target: "",
    icons: "",
    active: true,
  },
  {
    label: "CAREERS",
    href: "/careers",
    icons: "",
    target: "",
    active: true,
  },
  {
    label: "LINKS",
    href: "https://linktr.ee/m33mlabs",
    icons: "",
    target: "_blank",
    active: true,
  },
];

export default function AppBar({ bg }) {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <Box position={"relative"} zIndex={9}>
      <Flex
        bg={bg}
        color={useColorModeValue("#fff.900", "red")}
        minH={"72px"}
        paddingX={{ base: 0, md: 12, xl: 0 }}
        paddingY={{ base: "18px", md: "10px" }}
        id="top"
        justifyContent={"center"}
        w="full"
        align={"center"}
        pt="30px"
      >
        <Flex
          // maxW={"1200px"}
          justifyContent={"space-between"}
          px={{ lg: "10px", xl: 0 }}
          w={{ base: "full", xl: "100%" }}
          maxW={"90%"}
          align={"center"}
        >
          <Flex justifyContent={"flex-start"}>
            {!isDesktop && (
              <Button ref={btnRef} bg="none" color="#FFF" onClick={onOpen}>
                <HamburgerIcon fontSize={"36px"} />
              </Button>
            )}
            <Flex justifyContent={"center"} align={"center"}>
              <NextLink href={"/"}>
                <Flex gap={"15px"} alignItems={"center"} minWidth={"28px"}>
                  <Image
                    src="./asset/img/logo.png"
                    alt="m33m"
                    minW="70px"
                    height={"28px"}
                  />
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
                              fontSize={"20px"}
                              fontFamily="Anta"
                              color={
                                currentPath === navItem.href
                                  ? "#0068FF"
                                  : "#fff"
                              }
                              cursor={
                                navItem.active ? "pointer" : "not-allowed"
                              }
                              _hover={{
                                textDecoration: "none",
                                color: "#0068FF",
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
                                fontSize={"20px"}
                                fontFamily="Anta"
                                textAlign="center"
                                color={
                                  currentPath === navItem.href
                                    ? "#0068FF"
                                    : "#fff"
                                }
                                cursor={
                                  navItem.active ? "pointer" : "not-allowed"
                                }
                                _hover={{
                                  textDecoration: "none",
                                  color: "#0068FF",
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "400",
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
              mx="auto"
              background={"#0068FF"}
              backgroundSize={"cover"}
            >
              <DrawerCloseButton mt={"9px"} size="base" color={"#FFF"} />
              <DrawerHeader>
                <NextLink href={"/"}>
                  <Flex gap={2} alignItems={"center"} w="full" h="full">
                    <Image
                      src="./asset/img/logo.png"
                      alt="m33m"
                      minW="70px"
                      height={"28px"}
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
                              fontFamily="Anta"
                              fontWeight={700}
                              color={navItem.active ? "#FFF" : "gray"}
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
                            fontFamily="Anta"
                            color={navItem.active ? "#FFF" : "gray"}
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
              fontFamily="Anta"
            >
              {label}
            </Text>
          </Box>
        </Stack>
      </Box>
    </a>
  );
};
