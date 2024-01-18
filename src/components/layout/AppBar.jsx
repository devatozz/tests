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
                    src={"/blast/logoApp.svg"}
                    alt="blasttrade"
                    height={"42px"}
                  />
                  <Box display={{ base: "none", xl: "block" }} >
                    <svg width="254" height="21" viewBox="0 0 254 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.79008 8.36914H16.3858C16.6501 8.36914 16.8871 8.26432 17.0967 8.05469C17.3064 7.84505 17.4112 7.58529 17.4112 7.27539V6.5918C17.4112 6.2819 17.3064 6.02214 17.0967 5.8125C16.8871 5.60286 16.6501 5.49805 16.3858 5.49805H5.79008V8.36914ZM5.79008 8.65625V15.8887H17.753C18.0173 15.8887 18.2543 15.7839 18.4639 15.5742C18.6735 15.3646 18.7784 15.1048 18.7784 14.7949V14.1113C18.7784 13.8014 18.6735 13.5417 18.4639 13.332C18.2543 13.1224 18.0173 13.0176 17.753 13.0176H7.2393L5.79008 8.65625ZM0.321327 20.5371V0.849609H19.1202C20.1774 0.849609 21.0661 1.21419 21.7862 1.94336C22.5153 2.66341 22.8799 3.5293 22.8799 4.54102V9.20312C22.9437 9.25781 23.0349 9.33984 23.1534 9.44922C23.8825 10.1784 24.2471 11.0488 24.2471 12.0605V16.8457C24.2471 17.8574 23.8825 18.7279 23.1534 19.457C22.4333 20.1771 21.5446 20.5371 20.4873 20.5371H0.321327ZM32.5859 14.7949C32.5859 15.1048 32.6907 15.3646 32.9003 15.5742C33.1099 15.7839 33.3469 15.8887 33.6112 15.8887H45.5741V20.5371H30.8769C29.8196 20.5371 28.9264 20.1771 28.1972 19.457C27.4771 18.7279 27.1171 17.8574 27.1171 16.8457V0.849609H32.5859V14.7949ZM56.7566 13.1543H63.2645L60.0105 6.64648L56.7566 13.1543ZM56.6063 13.4688L53.0652 20.5371H46.8582L56.702 0.849609H61.7195C62.7859 0.849609 63.5698 1.35547 64.0711 2.36719L73.1629 20.5371H66.9559L65.5887 17.8027H58.0418L56.6063 13.4688ZM77.3044 13.0176C76.2471 13.0176 75.3539 12.6576 74.6247 11.9375C73.9046 11.2083 73.5446 10.3379 73.5446 9.32617V4.54102C73.5446 3.5293 73.9046 2.66341 74.6247 1.94336C75.3539 1.21419 76.2471 0.849609 77.3044 0.849609H93.7106C94.7679 0.849609 95.6566 1.21419 96.3766 1.94336C97.1058 2.66341 97.4704 3.5293 97.4704 4.54102V5.49805H80.0387C79.7744 5.49805 79.5374 5.60286 79.3278 5.8125C79.1182 6.02214 79.0134 6.2819 79.0134 6.5918V7.27539C79.0134 7.58529 79.1182 7.84505 79.3278 8.05469C79.5374 8.26432 79.7744 8.36914 80.0387 8.36914H93.7106C94.7679 8.36914 95.6566 8.73372 96.3766 9.46289C97.1058 10.1829 97.4704 11.0488 97.4704 12.0605V16.8457C97.4704 17.8574 97.1058 18.7279 96.3766 19.457C95.6566 20.1771 94.7679 20.5371 93.7106 20.5371H77.3044C76.2471 20.5371 75.3539 20.1771 74.6247 19.457C73.9046 18.7279 73.5446 17.8574 73.5446 16.8457V15.8887H90.9762C91.2406 15.8887 91.4776 15.7839 91.6872 15.5742C91.8968 15.3646 92.0016 15.1048 92.0016 14.7949V14.1113C92.0016 13.8014 91.8968 13.5417 91.6872 13.332C91.4776 13.1224 91.2406 13.0176 90.9762 13.0176H77.3044ZM98.9459 0.849609H122.872V5.49805H98.9459V0.849609ZM108.174 5.52539L113.643 7.08398V20.5371H108.174V5.52539ZM124.949 0.849609H148.874V5.49805H124.949V0.849609ZM134.177 5.52539L139.646 7.08398V20.5371H134.177V5.52539ZM156.53 10.4199H168.492C168.757 10.4199 168.994 10.3151 169.203 10.1055C169.413 9.89583 169.518 9.63607 169.518 9.32617V6.5918C169.518 6.2819 169.413 6.02214 169.203 5.8125C168.994 5.60286 168.757 5.49805 168.492 5.49805H156.53V10.4199ZM156.53 10.707V20.5371H151.061V0.849609H171.227C172.284 0.849609 173.173 1.21419 173.893 1.94336C174.622 2.66341 174.987 3.5293 174.987 4.54102V10.0098C174.987 10.8301 174.485 11.7415 173.483 12.7441C174.485 13.7467 174.987 14.6582 174.987 15.4785V20.5371H169.518V16.1621C169.518 15.8522 169.413 15.5924 169.203 15.3828C168.994 15.1732 168.757 15.0684 168.492 15.0684H157.979L156.53 10.707ZM186.169 13.1543H192.677L189.423 6.64648L186.169 13.1543ZM186.019 13.4688L182.478 20.5371H176.271L186.114 0.849609H191.132C192.198 0.849609 192.982 1.35547 193.484 2.36719L202.575 20.5371H196.368L195.001 17.8027H187.454L186.019 13.4688ZM209.328 15.8887H221.291C221.555 15.8887 221.792 15.7839 222.002 15.5742C222.212 15.3646 222.316 15.1048 222.316 14.7949V6.5918C222.316 6.2819 222.212 6.02214 222.002 5.8125C221.792 5.60286 221.555 5.49805 221.291 5.49805H209.328V15.8887ZM209.328 16.1758V20.5371H203.859V0.849609H224.025C225.083 0.849609 225.971 1.21419 226.691 1.94336C227.421 2.66341 227.785 3.5293 227.785 4.54102V16.8457C227.785 17.8574 227.421 18.7279 226.691 19.457C225.971 20.1771 225.083 20.5371 224.025 20.5371H210.777L209.328 16.1758ZM236.534 8.36914H250.124L251.669 13.0176H237.983L236.534 8.65625V14.7949C236.534 15.1048 236.639 15.3646 236.849 15.5742C237.058 15.7839 237.295 15.8887 237.56 15.8887H253.624V20.5371H234.825C233.768 20.5371 232.875 20.1771 232.145 19.457C231.425 18.7279 231.065 17.8574 231.065 16.8457V4.54102C231.065 3.5293 231.425 2.66341 232.145 1.94336C232.875 1.21419 233.768 0.849609 234.825 0.849609H253.624V5.49805H237.56C237.295 5.49805 237.058 5.60286 236.849 5.8125C236.639 6.02214 236.534 6.2819 236.534 6.5918V8.36914Z" fill="#FCFC05" />
                    </svg>
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

          <Flex gap={"14px"}>
            <NextLink href={""} target="self_">
              <Button
                backgroundColor={"#FCFC05"}
                transition="background-color 0.3s ease-in-out"
                _hover={{
                  bg: "#fff",
                }}
                style={{
                  borderRadius: "4px",
                }}

                padding={{ base: '7px 14px', md: "16px 32px" }}
                height={{ base: "30px", md: "45px" }}
              // onClick={onComingSoonOpen}
              >
                <Text
                  fontFamily={"Lakes"}
                  color={"black"}
                  fontWeight={"700"}
                  fontSize={{ base: "12px", md: "16px" }}>Launch App</Text>
              </Button>
            </NextLink>
            <Box
              display={{ base: 'block', md: 'none' }}
              border={"1px solid #fcfdc773"}
              borderRadius={"3.5px"}
              p={"7px"}
              h={30}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.9994 14.1228C11.3807 14.1228 14.1219 11.3817 14.1219 8.00038C14.1219 4.61904 11.3807 1.87793 7.9994 1.87793C4.61807 1.87793 1.87695 4.61904 1.87695 8.00038C1.87695 11.3817 4.61807 14.1228 7.9994 14.1228Z" stroke="#FCFC05" strokeWidth="0.918367" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.54976 2.49023H6.16201C4.96813 6.06574 4.96813 9.93513 6.16201 13.5106H5.54976" stroke="#FCFC05" strokeWidth="0.918367" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.83594 2.49023C11.0298 6.06574 11.0298 9.93513 9.83594 13.5106" stroke="#FCFC05" strokeWidth="0.918367" strokeLinecap="round" MorestrokeLinejoin="round" />
                <path d="M2.48926 10.4492V9.83691C6.06477 11.0308 9.93416 11.0308 13.5097 9.83691V10.4492" stroke="#FCFC05" strokeWidth="0.918367" strokeLinecap="round" MorestrokeLinejoin="round" />
                <path d="M2.48926 6.16396C6.06477 4.97009 9.93416 4.97009 13.5097 6.16396" stroke="#FCFC05" strokeWidth="0.918367" strokeLinecap="round" MorestrokeLinejoin="round" />
              </svg>
            </Box>
          </Flex>
          {/* <ComingSoonModal
            isOpen={comingSoonOpen}
            onClose={onComingSoonClose}
          /> */}
        </Flex>
      </Flex>

      {
        !isDesktop && (
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
                backgroundImage={"url('/blast/menu-drawer-mobile.png')"}
                backgroundSize={"cover"}>
                <DrawerCloseButton mt={"9px"} size="base" color={"#FCFDC7"} />
                <DrawerHeader>
                  <NextLink href={"/"}>
                    <Flex gap={2} alignItems={"center"} w="full" h="full">
                      <Image src={"/blast/logo.png"} alt="blast trade" h={18} />
                    </Flex>
                  </NextLink>
                </DrawerHeader>

                <DrawerBody
                  position="relative"
                  p={0}
                >
                  <VStack
                    w="full"
                    direction={"row"}
                    spacing={4}
                    alignItems="left"
                    backgroundBlendMode="overlay"
                    px={8}
                    pt={'40px'}
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
                              color="#FBFBFB"
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
        )
      }
    </Box >
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
