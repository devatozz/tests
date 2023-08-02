import React, { useCallback, useContext, useEffect } from "react";
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
  Input,
  Show,
  DrawerFooter,
  useMediaQuery,
  VStack,
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
    label: "Airdrop",
    href: "/airdrop",
  },
  {
    label: "Bridge",
    href: "https://owlto.finance/bridge",
  },
  {
    label: "Whitepaper",
    href: "https://docs.pira.finance/",
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
        <Flex display={{ base: "none", md: "flex" }}>
          <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem, index) => (
              <NextLink
                key={index}
                href={navItem.href}
                passHref
                target={
                  navItem.label === "Bridge" || navItem.label === "Whitepaper"
                    ? "_blank"
                    : undefined
                }
              >
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
                >
                  {navItem.label}
                </Link>
              </NextLink>
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
                    <NextLink
                      key={index}
                      href={navItem.href}
                      passHref
                      target={
                        navItem.label === "Bridge" ||
                        navItem.label === "Whitepaper"
                          ? "_blank"
                          : undefined
                      }
                    >
                      <Link
                        pr={2}
                        py={2}
                        fontSize={"base"}
                        fontWeight={700}
                        onClick={onClose}
                        color="white"
                        _hover={{
                          textDecoration: "none",

                          color: "gray",
                        }}
                      >
                        {navItem.label}
                      </Link>
                    </NextLink>
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
