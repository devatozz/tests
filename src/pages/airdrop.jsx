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
import React, { useState } from "react";
import NextLink from "next/link";
import { Tooltip } from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
// firebase
import { signInWithPopup } from "firebase/auth";
import { auth, TwitterAuthProvider } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
// firebase
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { helperToast } from "src/lib/helpToast";
import { CheckIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
const airdrop = () => {
  const toast = useToast();
  // state
  const [userInfo, setUserInfo] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loadingRetweet, setLoadingRetweet] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [loadingDiscord, setLoadingDiscord] = useState(false);
  const [isDiscord, setIsDiscord] = useState(false);
  // user infor action
  const [userInfoAction, setUserInfoAction] = useState({
    name: "",
    UID: "",
    follow: false,
    retweet: false,
    joinDiscord: false,
    wallet: "",
    image: "",
  });
  const provider = new TwitterAuthProvider();
  // login
  const login = () => {
    setLoadingLogin(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        const user = result.user;
        if (user) {
          setIsSignedIn(true);
          setUserInfo(user);
          setUserInfoAction({
            name: user.displayName,
            UID: user.uid,
            image: user.photoURL,
            follow: false,
            retweet: false,
            joinDiscord: false,
            wallet: "",
          });
          setLoadingLogin(false);
          toast({
            title: "Login success.",
            // description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error?.customData?.email;
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMessage);
        setIsSignedIn(false);
        setLoadingLogin(false);
        toast({
          title: "Login failed.",
          // description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };
  // logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  console.log("userInfo", userInfo);
  console.log("userInfoAction", userInfoAction);
  // handle follow twitter:
  function handleClickFollow() {
    setLoadingFollow(true);
    const twitterFollowUrl =
      "https://twitter.com/intent/follow?screen_name=Blast_Trade";
    window.open(twitterFollowUrl, "_blank");
    setTimeout(() => {
      setLoadingFollow(false);
    }, 10000);
    setIsFollowed(true);
  }
  // handle reweet twitter:
  function handleClickRetweet() {
    setLoadingRetweet(true);
    const twitterRetweetUrl =
      "https://twitter.com/intent/retweet?tweet_id=1769762551632412677";
    window.open(twitterRetweetUrl, "_blank");
    setTimeout(() => {
      setLoadingRetweet(false);
    }, 10000);
    setIsRetweeted(true);
  }
  // handle join discord:
  function handleJoinDiscord() {
    setLoadingDiscord(true);
    const discordUrl = "https://discord.com/invite/DmrKCDS7";
    window.open(discordUrl, "_blank");
    setTimeout(() => {
      setLoadingDiscord(false);
    }, 10000);
    setIsDiscord(true);
  }

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
                  {isSignedIn ? (
                    <>
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
                        onClick={handleClickFollow}
                      >
                        <Text color={"#FCFDC7"}>Follow</Text>
                      </Button>
                      <Box
                        height={{ base: "45px", md: "60px" }}
                        width={{ base: "45px", md: "60px" }}
                        backgroundColor={isFollowed ? "#4b553b" : "transparent"}
                        transition="background-color 0.3s ease-in-out"
                        border={"1px solid #FCFDC7"}
                        borderRadius={"3px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        _hover={{
                          bg: "rgba(195, 211, 165, 0.2)",
                          color: "#000",
                        }}
                        style={{
                          fontSize: "20px",
                          fontFamily: "Lakes",
                          fontWeight: "700",
                        }}
                      >
                        {loadingFollow ? (
                          <Spinner color="#75835D" speed="1s" />
                        ) : (
                          <CheckIcon
                            color={isFollowed ? "#EEEE06" : "#75835D"}
                            fontSize={"20px"}
                          />
                        )}
                      </Box>
                    </>
                  ) : (
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
                      onClick={login}
                    >
                      <Text color={"#FCFDC7"}>Login X</Text>
                    </Button>
                  )}
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
                  {isSignedIn ? (
                    <>
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
                        onClick={handleClickRetweet}
                      >
                        <Text color={"#FCFDC7"}>Retweet</Text>
                      </Button>
                      <Box
                        height={{ base: "45px", md: "60px" }}
                        width={{ base: "45px", md: "60px" }}
                        backgroundColor={
                          isRetweeted ? "#4b553b" : "transparent"
                        }
                        transition="background-color 0.3s ease-in-out"
                        border={"1px solid #FCFDC7"}
                        borderRadius={"3px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        _hover={{
                          bg: "rgba(195, 211, 165, 0.2)",
                          color: "#000",
                        }}
                        style={{
                          fontSize: "20px",
                          fontFamily: "Lakes",
                          fontWeight: "700",
                        }}
                      >
                        {loadingRetweet ? (
                          <Spinner color="#75835D" speed="1s" />
                        ) : (
                          <CheckIcon
                            color={isRetweeted ? "#EEEE06" : "#75835D"}
                            fontSize={"20px"}
                          />
                        )}
                      </Box>
                    </>
                  ) : (
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
                      onClick={login}
                    >
                      <Text color={"#FCFDC7"}>Login X</Text>
                    </Button>
                  )}
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
                  {isSignedIn ? (
                    <>
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
                        onClick={handleJoinDiscord}
                      >
                        <Text color={"#FCFDC7"}>Join</Text>
                      </Button>
                      <Box
                        height={{ base: "45px", md: "60px" }}
                        width={{ base: "45px", md: "60px" }}
                        backgroundColor={isDiscord ? "#4b553b" : "transparent"}
                        transition="background-color 0.3s ease-in-out"
                        border={"1px solid #FCFDC7"}
                        borderRadius={"3px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        _hover={{
                          bg: "rgba(195, 211, 165, 0.2)",
                          color: "#000",
                        }}
                        style={{
                          fontSize: "20px",
                          fontFamily: "Lakes",
                          fontWeight: "700",
                        }}
                      >
                        {loadingDiscord ? (
                          <Spinner color="#75835D" speed="1s" />
                        ) : (
                          <CheckIcon
                            color={isDiscord ? "#EEEE06" : "#75835D"}
                            fontSize={"20px"}
                          />
                        )}
                      </Box>
                    </>
                  ) : (
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
                      onClick={handleJoinDiscord}
                    >
                      <Text color={"#FCFDC7"}>Join Discord</Text>
                    </Button>
                  )}
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
                  {isSignedIn ? (
                    <>
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
                        onClick={handleClickRetweet}
                      >
                        <Text color={"#FCFDC7"}>Submit</Text>
                      </Button>
                      <Box
                        height={{ base: "45px", md: "60px" }}
                        width={{ base: "45px", md: "60px" }}
                        backgroundColor={
                          isRetweeted ? "#4b553b" : "transparent"
                        }
                        transition="background-color 0.3s ease-in-out"
                        border={"1px solid #FCFDC7"}
                        borderRadius={"3px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        _hover={{
                          bg: "rgba(195, 211, 165, 0.2)",
                          color: "#000",
                        }}
                        style={{
                          fontSize: "20px",
                          fontFamily: "Lakes",
                          fontWeight: "700",
                        }}
                      >
                        {loadingRetweet ? (
                          <Spinner color="#75835D" speed="1s" />
                        ) : (
                          <CheckIcon
                            color={isRetweeted ? "#EEEE06" : "#75835D"}
                            fontSize={"20px"}
                          />
                        )}
                      </Box>
                    </>
                  ) : (
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
                      onClick={login}
                    >
                      <Text color={"#FCFDC7"}>Login X</Text>
                    </Button>
                  )}
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
