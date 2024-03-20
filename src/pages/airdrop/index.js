import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Container,
  SimpleGrid,
  Image,
  Heading,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
import { useState } from "react";

function Index() {
  const [inputRef, setInputRef] = useState("0x0");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputRef(inputValue);
  };
  return (
    <Box bg={"#22281a"}>
      <Box
        // backgroundImage="url('./blast/background/tradebackground.svg') "
        backgroundImage="url(https://raw.githubusercontent.com/devBlasttrade/image-repo/patch-1/bg2.jpg)"
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        width={"100%"}
        height={"100vh"}
      >
        <Container
          maxW={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          flexDirection={"row"}
          paddingY={"20px"}
        >
          <Box
            as={Box}
            width={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Box width={"90%"}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "28px", md: "50px" }}
                lineHeight={{ base: "36px", xl: "50px" }}
                color={"#fff"}
                textAlign={{ md: "left", base: "left" }}
                fontFamily="Lakes"
                marginTop={{ base: "10px", md: "40px" }}
              >
                Invite Code
              </Heading>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={"10px"}
                marginTop={{ base: "10px", md: "30px" }}
              >
                <NextLink href={"/"}>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "12px", md: "18px", "2xl": "18px" }}
                    fontWeight={{ base: "400", md: "700" }}
                    lineHeight={{ base: "19px", xl: "22px", "2xl": "28px" }}
                    fontFamily="Lakes"
                    fontStyle={"normal"}
                    textAlign={{ md: "left", base: "left" }}
                    cursor={"pointer"}
                    _hover={{
                      color: "#FCFDC7",
                    }}
                  >
                    Home
                  </Text>
                </NextLink>
                <Text
                  color={"#fff"}
                  fontSize={{ base: "12px", md: "18px", "2xl": "18px" }}
                  fontWeight={{ base: "400", md: "700" }}
                  lineHeight={{ base: "19px", xl: "22px", "2xl": "28px" }}
                  fontFamily="Lakes"
                  fontStyle={"normal"}
                  textAlign={{ md: "left", base: "left" }}
                >
                  <IoChevronForward />
                </Text>
                <Text
                  color={"#EEEE06"}
                  fontSize={{ base: "12px", md: "18px", "2xl": "18px" }}
                  fontWeight={{ base: "400", md: "700" }}
                  lineHeight={{ base: "19px", xl: "22px", "2xl": "28px" }}
                  fontFamily="Lakes"
                  fontStyle={"normal"}
                  textAlign={{ md: "left", base: "left" }}
                  marginTop={{ base: "20px 15px", md: "30px 30px" }}
                >
                  Airdrop
                </Text>
              </Box>

              <Box>
                <Box
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-end"}
                  flexDirection={"column"}
                >
                  <Text
                    color={"#EEEE06"}
                    fontSize={{ base: "12px", md: "18px", "2xl": "18px" }}
                    fontWeight={{ base: "400", md: "700" }}
                    lineHeight={{ base: "19px", xl: "22px", "2xl": "28px" }}
                    fontFamily="Lakes"
                    fontStyle={"normal"}
                    textAlign={{ md: "left", base: "left" }}
                    marginTop={{ base: "10px", md: "20px" }}
                  >
                    Input your invite code here
                  </Text>
                  <Box
                    marginTop={"30px"}
                    bg={"#75835d"}
                    width={{ md: "500px", base: "300px" }}
                    borderRadius={"3px"}
                  >
                    <Input
                      type="text"
                      color={"#fff"}
                      placeholder={"Input your invite code..."}
                      fontFamily="Lakes"
                      onChange={handleInputChange}
                      width={"100%"}
                      border={"1px solid transparent"}
                      _placeholder={{ color: "#c3d3a5" }}
                      fontSize={{ base: "14px", md: "24px" }}
                      padding={{ md: "32px", base: "16px" }}
                      style={{
                        background: "transparent",
                        color: "#fff",
                      }}
                      _focus={{
                        boxShadow: "none",
                        borderColor: "transparent",
                      }}
                      _hover={{
                        borderColor: "transparent",
                        cursor: "pointer",
                      }}
                      _active={{
                        borderColor: "transparent",
                      }}
                    />
                  </Box>
                  <Box
                    marginTop={"30px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={{ md: "500px", base: "300px" }}
                    gap={"20px"}
                  >
                    <Box width={"100%"}>
                      <NextLink
                        href="/airdrop/[...detail]"
                        as={`/airdrop/${inputRef}`}
                      >
                        <Button
                          backgroundColor={"#FCFC05"}
                          fontFamily="Lakes"
                          transition="background-color 0.3s ease-in-out"
                          _hover={{
                            bg: "#fff",
                          }}
                          style={{
                            borderRadius: "4px",
                            padding: "16px 32px",
                            fontFamily: "Lakes",
                            fontWeight: "700",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
                          height={{ base: "30px", md: "60px" }}
                          width={"100%"}
                          // onClick={onComingSoonOpen}
                        >
                          <Text fontFamily="Lakes" color={"#000"}>
                            Enter
                          </Text>
                        </Button>
                      </NextLink>
                    </Box>
                    <Box width={"100%"}>
                      <NextLink
                        href="/airdrop/[...detail]"
                        as="/airdrop/detail"
                      >
                        <Button
                          backgroundColor={"#22281a"}
                          transition="background-color 0.3s ease-in-out"
                          border={"1px solid #FCFDC7"}
                          _hover={{
                            bg: "rgba(195, 211, 165, 0.2)",
                            color: "#000",
                          }}
                          style={{
                            // fontWeight: "bold",
                            borderRadius: "4px",
                            padding: "16px 32px",
                            fontFamily: "Lakes",
                            fontWeight: "700",
                          }}
                          fontSize={{ base: "11px", md: "20px" }}
                          width={"100%"}
                          height={{ base: "30px", md: "60px" }}
                          // onClick={onComingSoonOpen}
                        >
                          <Text fontFamily="Lakes" color={"#FCFDC7"}>
                            Skip
                          </Text>
                        </Button>
                      </NextLink>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Index;
