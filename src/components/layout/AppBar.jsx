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
const NAV_ITEMS = [
  {
    label: "App",
    href: "",
    icons: "",
    target: "self_",
  },
  {
    label: "NFT",
    href: "",
    target: "self_",

    icons: "",
  },
  {
    label: "Docs",
    href: "",
    target: "self_",

    icons: "",
  },
  {
    label: "Community",
    href: "",
    icons: "",
    target: "self_",
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
        bg="linear-gradient(180deg, #12140D 0%, #15170E 51.04%, #22281A 100%);"
        color={useColorModeValue("#fff.900", "red")}
        minH={"72px"}
        paddingX={{ base: 4, md: 12, xl: 0 }}
        paddingY={"10px"}
        id="top"
        justifyContent={"center"}
        w="full"
        align={"center"}
      >
        <Flex
          // maxW={"1200px"}
          justifyContent={"space-between"}
          px={{ lg: "10px", xl: "66px" }}
          w="full"
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
                <Flex gap={2} alignItems={"center"} minWidth={"42px"}>
                  <Image
                    src={"/blast/logoApp.svg"}
                    alt="blasttrade"
                    height={"42px"}
                  />
                  <Text
                    display={{ base: "none", xl: "block" }}
                    fontSize={"28px"}
                    fontFamily="Lakes"
                    color="#FCFC05"
                    fontWeight={"700"}
                    fontStyle={"bold"}
                  >
                    BLASTTRADE
                  </Text>
                </Flex>

              </NextLink>

              <Flex
                display={{
                  base: "none",
                  md: "flex",
                }}
                mx={{ md: 10, lg: 24 }}
              >
                <Stack direction={"row"}
                  spacing={{ base: "30px", md: "20px", xl: "40px" }}
                  justifyContent={"center"}>
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
                              color="#FCFDC7"
                              _hover={{
                                textDecoration: "none",
                                color: "#fff",
                              }}
                            >
                              {navItem.label}
                              {navItem.icons}
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
                                color="#FCFDC7"
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
          </Flex>

          <NextLink href={""} target="self_">
            <Button
              backgroundColor={"#FCFC05"}
              transition="background-color 0.3s ease-in-out"
              _hover={{
                bg: "#fff",
              }}
              style={{
                // fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "4px",
                padding: "16px 32px",
                fontFamily: "Lakes",
                fontWeight: "200",
              }}
              height={"45px"}
            // onClick={onComingSoonOpen}
            >
              <Text color={"#000"}>Launch App</Text>
            </Button>
          </NextLink>
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
            placement="top"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton size="lg" color={"#FCFDC7"} />
              <DrawerHeader bg="linear-gradient(180deg, #12140D 0%, #15170E 51.04%, #22281A 100%);">
                <NextLink href={"/"}>
                  <Flex gap={2} alignItems={"center"} w="full" h="full">
                    <Image src={"/blast/logo.png"} alt="blast trade" h={30} />
                  </Flex>
                </NextLink>
              </DrawerHeader>
              <DrawerBody
                position="relative"
                p={0}
                style={{
                  backdropFilter: "blur(40px)",
                  background: "#C3D3A5",
                }}
              >
                <VStack
                  w="full"
                  direction={"row"}
                  spacing={4}
                  alignItems="left"
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
                              color="#FCFDC7"
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
                            color="#000"
                            _hover={{
                              textDecoration: "none",
                              color: "#fff",
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              fontWeight: "600",
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
