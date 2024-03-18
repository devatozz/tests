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
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Tooltip } from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
const airdrop = () => {
  return (
    <Box
      backgroundImage="url('./blast/background/tradebackground.svg') "
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      width={"100%"}
      height={"fit-content"}
    >
      <Container
        maxW={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        flexDirection={{ md: "row", base: "column-reverse" }}
        paddingY={"30px"}
      >
        <Box
          as={Box}
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          flexDirection={"column"}
        >
          <Box width={"95%"}>
            <Heading
              fontWeight={600}
              fontSize={{ base: "28px", md: "50px" }}
              lineHeight={{ base: "36px", xl: "50px" }}
              color={"#fff"}
              textAlign={{ md: "left", base: "left" }}
              fontFamily="Lakes"
              marginTop={"80px"}
            >
              Ecosystem Airdrop
            </Heading>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"10px"}
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
                  marginTop={"30px"}
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
                marginTop={"30px"}
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
                marginTop={"30px"}
              >
                Airdrop
              </Text>
            </Box>
            <Box
              bg={"#22281a"}
              borderRadius={"12px"}
              width={"90%"}
              height={"500px"}
              marginTop={"30px"}
              padding={"30px"}
            >
              <Text
                color={"#fff"}
                fontSize={{ base: "12px", md: "24px" }}
                fontWeight={{ base: "300", md: "400" }}
                lineHeight={{ base: "19px", md: "28px" }}
                fontFamily="Lakes"
                fontStyle={"normal"}
                textAlign={{ md: "left", base: "left" }}
                marginTop={"30px"}
                width={{ md: "80%", base: "100%" }}
              >
                Complete the following tasks to share a{" "}
                <span style={{ color: "#EEEE06" }}>1,000,000 BMX</span> prize
                pool on mainnet
              </Text>
              <Box
                marginTop={"30px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={"32px"}
                      fontWeight={"700"}
                    >
                      1
                    </Text>
                  </Box>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "12px", md: "24px" }}
                    fontWeight={"500"}
                  >
                    Follow Blast Trade
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Button
                    width={{ md: "180px", base: "120px" }}
                    backgroundColor={"transparent"}
                    transition="background-color 0.3s ease-in-out"
                    border={"1px solid #FCFDC7"}
                    _hover={{
                      bg: "rgba(195, 211, 165, 0.2)",
                      color: "#000",
                    }}
                    style={{
                      // fontWeight: "bold",
                      fontSize: "20px",
                      borderRadius: "4px",
                      padding: "16px 32px",
                      fontFamily: "Lakes",
                      fontWeight: "700",
                    }}
                    height={{ base: "45px", md: "60px" }}
                    // onClick={onComingSoonOpen}
                  >
                    <Text color={"#FCFDC7"}>Follow</Text>
                  </Button>
                </Box>
              </Box>
              <Box
                marginTop={"30px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={"32px"}
                      fontWeight={"700"}
                    >
                      2
                    </Text>
                  </Box>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "12px", md: "24px" }}
                    fontWeight={"500"}
                  >
                    Retweet the post
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Button
                    width={{ md: "180px", base: "120px" }}
                    backgroundColor={"transparent"}
                    transition="background-color 0.3s ease-in-out"
                    border={"1px solid #FCFDC7"}
                    _hover={{
                      bg: "rgba(195, 211, 165, 0.2)",
                      color: "#000",
                    }}
                    style={{
                      // fontWeight: "bold",
                      fontSize: "20px",
                      borderRadius: "4px",
                      padding: "16px 32px",
                      fontFamily: "Lakes",
                      fontWeight: "700",
                    }}
                    height={{ base: "45px", md: "60px" }}
                    // onClick={onComingSoonOpen}
                  >
                    <Text color={"#FCFDC7"}>Retweet</Text>
                  </Button>
                </Box>
              </Box>
              <Box
                marginTop={"30px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={"32px"}
                      fontWeight={"700"}
                    >
                      3
                    </Text>
                  </Box>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "12px", md: "24px" }}
                    fontWeight={"500"}
                  >
                    Join our Discord
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Button
                    width={{ md: "180px", base: "120px" }}
                    backgroundColor={"transparent"}
                    transition="background-color 0.3s ease-in-out"
                    border={"1px solid #FCFDC7"}
                    _hover={{
                      bg: "rgba(195, 211, 165, 0.2)",
                      color: "#000",
                    }}
                    style={{
                      // fontWeight: "bold",
                      fontSize: "20px",
                      borderRadius: "4px",
                      padding: "16px 32px",
                      fontFamily: "Lakes",
                      fontWeight: "700",
                    }}
                    height={{ base: "45px", md: "60px" }}
                    // onClick={onComingSoonOpen}
                  >
                    <Text color={"#FCFDC7"}>Join</Text>
                  </Button>
                </Box>
              </Box>
              <Box
                marginTop={"30px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={"32px"}
                      fontWeight={"700"}
                    >
                      4
                    </Text>
                  </Box>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "12px", md: "24px" }}
                    fontWeight={"500"}
                  >
                    Enter your EVM address
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Button
                    backgroundColor={"transparent"}
                    width={{ md: "180px", base: "120px" }}
                    transition="background-color 0.3s ease-in-out"
                    border={"1px solid #FCFDC7"}
                    _hover={{
                      bg: "rgba(195, 211, 165, 0.2)",
                      color: "#000",
                    }}
                    style={{
                      // fontWeight: "bold",
                      fontSize: "20px",
                      borderRadius: "4px",
                      padding: "16px 32px",
                      fontFamily: "Lakes",
                      fontWeight: "700",
                    }}
                    height={{ base: "45px", md: "60px" }}
                    // onClick={onComingSoonOpen}
                  >
                    <Text color={"#FCFDC7"}>Submit</Text>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Flex alignItems={"flex-start"} justifyContent="flex-end">
          <Image
            src="./blast/background/airdrophero.png"
            alt="blast landing"
            width={"100%"}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default airdrop;
