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
import Network from "./Network";
import { HamburgerIcon } from "@chakra-ui/icons";
import PiraText from "../icons/PiraText";

const NAV_ITEMS = [
  {
    label: "Swap",
    href: "/swap",
  },
  {
    label: "Liquidity",
    href: "/liquidity",
  },
  {
    label: "Staking",
    href: "/staking",
  },
  {
    label: "Airdrop🔥",
    href: "/airdrop",
  },
  {
    label: "Bridge",
    children: [
      {
        label: "Orbiter",
        href: "https://www.orbiter.finance/?source=Ethereum&dest=Base",
        target: "_blank",
      },
      {
        label: "XY Finance",
        href: "https://app.xy.finance/",
        target: "_blank",
      },
    ],
  },

  {
    label: "Whitepaper",
    href: "https://docs.pira.finance/",
    target: "_blank",
  },
];

export default function AppBar() {
  const [isDesktop] = useMediaQuery("(min-width: 680px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 20 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        justifyContent={"space-between"}
        w="full"
        align={"center"}
        bgColor={"#212B6B"}
      >
        {!isDesktop && (
          <Button ref={btnRef} bg="#18215d" color="white" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
        )}

        <NextLink href={"/"}>
          <Flex gap={2} alignItems={"center"}>
            <Image src={"/piralogo.svg"} alt="pira.finance" h={30} />
            <Show above="md">
              <PiraText />
            </Show>
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
                        fontSize={"22px"}
                        fontWeight={700}
                        color="white"
                        _hover={{
                          textDecoration: "none",
                          color: "gray",
                        }}
                        isExternal={
                          navItem.label === "Whitepaper" ? true : false
                        }
                      >
                        {navItem.label}
                      </Link>
                    ) : (
                      <NextLink href={navItem.href} passHref>
                        <Text
                          pr={2}
                          fontSize={"22px"}
                          fontWeight={700}
                          color="white"
                          _hover={{
                            textDecoration: "none",
                            color: "gray",
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
        <Network />
      </Flex>
      {!isDesktop && (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody bg="#3045c3">
              <Flex h="full" w="full" align={"center"}>
                <VStack w="full" direction={"row"} spacing={4} align="center">
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
                              isExternal={
                                navItem.label === "Whitepaper" ? true : false
                              }
                            >
                              {navItem.label}
                            </Link>
                          </PopoverTrigger>
                          <PopoverContent
                            border={0}
                            boxShadow={"xl"}
                            p={4}
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
                          target={
                            navItem.label === "Whitepaper"
                              ? "_blank"
                              : undefined
                          }
                          isExternal={
                            navItem.label === "Whitepaper" ? true : false
                          }
                        >
                          {navItem.label}
                        </Link>
                      )}
                    </Box>
                  ))}
                </VStack>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
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
