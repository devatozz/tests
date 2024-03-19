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
  const [userInfo, setUserInfo] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loadingRetweet, setLoadingRetweet] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [loadingDiscord, setLoadingDiscord] = useState(false);
  const [isDiscord, setIsDiscord] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [userWallet, setUserWallet] = useState("");
  const [validateWalletMess, setValidateMess] = useState("");

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
  const updateUserInfoAction = (newAction) => {
    setUserInfoAction((prevState) => ({ ...prevState, ...newAction }));
  };
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
          updateUserInfoAction({
            name: user.displayName,
            UID: user.uid,
            image: user.photoURL,
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
        setUserInfoAction({
          name: "",
          UID: "",
          follow: false,
          retweet: false,
          joinDiscord: false,
          wallet: "",
          image: "",
        });
        setIsSignedIn(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // handle follow twitter:
  function handleClickFollow() {
    setLoadingFollow(true);
    const twitterFollowUrl =
      "https://twitter.com/intent/follow?screen_name=Blast_Trade";
    window.open(twitterFollowUrl, "_blank");
    setTimeout(() => {
      setLoadingFollow(false);
      setIsFollowed(true);
      updateUserInfoAction({ follow: true });
    }, 7000);
  }
  // handle reweet twitter:
  function handleClickRetweet() {
    setLoadingRetweet(true);
    const twitterRetweetUrl =
      "https://twitter.com/intent/retweet?tweet_id=1769762551632412677";
    window.open(twitterRetweetUrl, "_blank");
    setTimeout(() => {
      setLoadingRetweet(false);
      setIsRetweeted(true);
      updateUserInfoAction({ retweet: true });
    }, 7000);
  }
  // handle join discord:
  function handleJoinDiscord() {
    setLoadingDiscord(true);
    const discordUrl = "https://discord.com/invite/DmrKCDS7";
    window.open(discordUrl, "_blank");
    setTimeout(() => {
      setLoadingDiscord(false);
      setIsDiscord(true);
      updateUserInfoAction({ joinDiscord: true });
    }, 7000);
  }
  // check account in database
  async function hasAccountInDatabase(database, UID) {
    const walletsRef = collection(database, "blasttrade_user");
    const q = query(walletsRef, where("UID", "==", UID));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
  // handle submit infor

  async function handleSubmit() {
    setLoadingSubmit(true);
    updateUserInfoAction({ wallet: userWallet });

    if (
      !userInfoAction.follow ||
      !userInfoAction.retweet ||
      !userInfoAction.joinDiscord ||
      !userInfoAction.UID ||
      !userWallet
    ) {
      toast({
        title:
          "You need to complete the task and input your wallet before submitting.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoadingSubmit(false);
    } else {
      try {
        const exists = await hasAccountInDatabase(db, userInfoAction.UID);
        if (exists) {
          toast({
            title: "Submit failed.",
            description: "This account has been linked with another wallet.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          setLoadingSubmit(false);
          setIsSubmit(false);
        } else {
          const docRef = await addDoc(collection(db, "blasttrade_user"), {
            name: userInfoAction.name,
            UID: userInfoAction.UID,
            follow: userInfoAction.follow,
            retweet: userInfoAction.retweet,
            joinDiscord: userInfoAction.joinDiscord,
            wallet: userWallet,
            image: userInfoAction.image,
          });
          setTimeout(() => {
            setLoadingSubmit(false);
            setIsSubmit(true);
            toast({
              title: "Submit success.",
              // description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
          }, 7000);
        }
      } catch (error) {
        console.error("Error adding document: ", error);
        setLoadingSubmit(false);
      }
    }
  }
  function isValidETHAddress(str) {
    let regex = new RegExp(/^(0x)?[0-9a-fA-F]{40}$/);
    if (str == null) {
      setValidateMess("Invalid input.");
      return false;
    }
    if (regex.test(str)) {
      setValidateMess("");
      return true;
    } else {
      setValidateMess("Please enter a valid Ethereum address.");
      return false;
    }
  }
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setUserWallet(inputValue);
    isValidETHAddress(inputValue);
  };
  return (
    <Box
      // backgroundImage="url('./blast/background/tradebackground.svg') "
      backgroundImage="url(https://raw.githubusercontent.com/devBlasttrade/image-repo/b6bae4045a26157254e3b9908a3dccfde929b295/tradebackground.svg)"
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
        flexDirection={"row"}
        paddingY={"20px"}
      >
        <Box
          as={Box}
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={{ md: "flex-end", base: "center" }}
          flexDirection={"column"}
        >
          <Box
            width={{ xl: "95%", lg: "100%" }}
            padding={{ xl: "0px", lg: "20px 0px" }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "28px", md: "50px" }}
              lineHeight={{ base: "36px", xl: "50px" }}
              color={"#fff"}
              textAlign={{ md: "left", base: "left" }}
              fontFamily="Lakes"
              marginTop={{ base: "10px", md: "40px" }}
            >
              Ecosystem Airdrop
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
            <Box
              bg={"#22281a"}
              borderRadius={"12px"}
              width={{ xl: "90%", md: "100%", base: "100%" }}
              height={"fit-content"}
              marginTop={{ base: "10px", md: "30px" }}
              padding={{ base: "10px", md: "30px" }}
            >
              {userInfoAction && userInfoAction.UID !== "" && (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  gap={"12px"}
                >
                  <Box
                    borderRadius={"50%"}
                    overflow={"hidden"}
                    width={"24px"}
                    height={"24px"}
                  >
                    <img
                      src={userInfoAction?.image}
                      alt="avatar"
                      width={"24px"}
                      height={"24px"}
                    />
                  </Box>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "12px", md: "24px" }}
                    fontWeight={{ base: "300", md: "400" }}
                    lineHeight={{ base: "19px", md: "28px" }}
                  >
                    {userInfoAction?.name}
                  </Text>
                  <Text
                    color={"#fff"}
                    fontSize={{ base: "12px", md: "24px" }}
                    fontWeight={{ base: "300", md: "400" }}
                    lineHeight={{ base: "19px", md: "28px" }}
                    _hover={{
                      color: "#FCFDC7",
                    }}
                    cursor={"pointer"}
                    onClick={logout}
                  >
                    Logout
                  </Text>
                </Box>
              )}
              <Text
                color={"#fff"}
                fontSize={{ base: "12px", md: "24px" }}
                fontWeight={{ base: "300", md: "400" }}
                lineHeight={{ base: "19px", md: "28px" }}
                fontFamily="Lakes"
                fontStyle={"normal"}
                textAlign={{ md: "left", base: "left" }}
                marginTop={{ base: "10px", md: "30px" }}
                width={{ md: "80%", base: "100%" }}
              >
                Complete the following tasks to share a{" "}
                <span style={{ color: "#EEEE06" }}>1,000,000 BMX</span> prize
                pool on mainnet
              </Text>
              {/* Follow */}

              <Box
                marginTop={{ base: "10px", md: "30px" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={{ base: "10px", md: "20px" }}
                >
                  <Box
                    width={{ base: "30px", md: "50px" }}
                    height={{ base: "30px", md: "50px" }}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={{ base: "18px", md: "32px" }}
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
                  gap={{ base: "10px", md: "20px" }}
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
                        fontSize={{ base: "14px", md: "20px" }}
                        padding={{ base: "12px 20px", md: "16px 32px" }}
                        style={{
                          borderRadius: "4px",
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
                      fontSize={{ base: "14px", md: "20px" }}
                      padding={{ base: "12px 20px", md: "16px 32px" }}
                      style={{
                        borderRadius: "4px",
                        fontFamily: "Lakes",
                        fontWeight: "700",
                      }}
                      height={{ base: "45px", md: "60px" }}
                      onClick={login}
                    >
                      {loadingLogin ? (
                        <Spinner color="#75835D" speed="1s" />
                      ) : (
                        <Text color={"#FCFDC7"}>Login X</Text>
                      )}
                    </Button>
                  )}
                </Box>
              </Box>
              {/* retweet */}

              <Box
                marginTop={{ base: "10px", md: "30px" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={{ base: "10px", md: "20px" }}
                >
                  <Box
                    width={{ base: "30px", md: "50px" }}
                    height={{ base: "30px", md: "50px" }}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={{ base: "18px", md: "32px" }}
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
                  gap={{ base: "10px", md: "20px" }}
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
                        isDisabled={!isFollowed}
                        padding={{ base: "12px 20px", md: "16px 32px" }}
                        fontSize={{ base: "14px", md: "20px" }}
                        style={{
                          borderRadius: "4px",
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
                      padding={{ base: "12px 20px", md: "16px 32px" }}
                      fontSize={{ base: "14px", md: "20px" }}
                      style={{
                        borderRadius: "4px",
                        fontFamily: "Lakes",
                        fontWeight: "700",
                      }}
                      isDisabled={!isFollowed}
                      height={{ base: "45px", md: "60px" }}
                      onClick={login}
                    >
                      <Text color={"#FCFDC7"}>Retweet</Text>
                    </Button>
                  )}
                </Box>
              </Box>
              {/* discord */}

              <Box
                marginTop={{ base: "10px", md: "30px" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={{ base: "10px", md: "20px" }}
                >
                  <Box
                    width={{ base: "30px", md: "50px" }}
                    height={{ base: "30px", md: "50px" }}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={{ base: "18px", md: "32px" }}
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
                  gap={{ base: "10px", md: "20px" }}
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
                        padding={{ base: "12px 20px", md: "16px 32px" }}
                        fontSize={{ base: "14px", md: "20px" }}
                        isDisabled={!isRetweeted}
                        style={{
                          borderRadius: "4px",
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
                      padding={{ base: "12px 20px", md: "16px 32px" }}
                      fontSize={{ base: "14px", md: "20px" }}
                      isDisabled={!isRetweeted}
                      style={{
                        borderRadius: "4px",
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
              {/* submit */}

              <Box
                marginTop={{ base: "10px", md: "30px" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={{ base: "10px", md: "20px" }}
                >
                  <Box
                    width={{ base: "30px", md: "50px" }}
                    height={{ base: "30px", md: "50px" }}
                    bg={"#c3d3a5"}
                    borderRadius={"3px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      color={"#75835d"}
                      fontSize={{ base: "18px", md: "32px" }}
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
                  gap={{ base: "10px", md: "20px" }}
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
                        isDisabled={!isDiscord || userWallet === ""}
                        padding={{ base: "12px 20px", md: "16px 32px" }}
                        fontSize={{ base: "14px", md: "20px" }}
                        style={{
                          borderRadius: "4px",
                          fontFamily: "Lakes",
                          fontWeight: "700",
                        }}
                        height={{ base: "45px", md: "60px" }}
                        onClick={handleSubmit}
                      >
                        <Text color={"#FCFDC7"}>Submit</Text>
                      </Button>
                      <Box
                        height={{ base: "45px", md: "60px" }}
                        width={{ base: "45px", md: "60px" }}
                        backgroundColor={isSubmit ? "#4b553b" : "transparent"}
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
                        fontSize={{ base: "14px", md: "20px" }}
                        style={{
                          fontFamily: "Lakes",
                          fontWeight: "700",
                        }}
                      >
                        {loadingSubmit ? (
                          <Spinner color="#75835D" speed="1s" />
                        ) : (
                          <CheckIcon
                            color={isSubmit ? "#EEEE06" : "#75835D"}
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
                      padding={{ base: "12px 20px", md: "16px 32px" }}
                      fontSize={{ base: "14px", md: "20px" }}
                      style={{
                        borderRadius: "4px",
                        fontFamily: "Lakes",
                        fontWeight: "700",
                      }}
                      isDisabled={!isDiscord}
                      height={{ base: "45px", md: "60px" }}
                    >
                      <Text color={"#FCFDC7"}>Submit</Text>
                    </Button>
                  )}
                </Box>
              </Box>
              {/* submit wallet */}
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box
                  marginTop={"30px"}
                  bg={"#75835d"}
                  width={"100%"}
                  borderRadius={"3px"}
                >
                  <Input
                    type="text"
                    onChange={handleInputChange}
                    color={"#fff"}
                    placeholder="0x..."
                    width={"100%"}
                    border={"1px solid transparent"}
                    _placeholder={{ color: "#c3d3a5" }}
                    fontSize={{ base: "14px", md: "24px" }}
                    padding={{ md: "24px", base: "16px" }}
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
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                marginTop={"10px"}
              >
                <Text color={"#ef4444"}>
                  {validateWalletMess && validateWalletMess}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display={{ xl: "block", base: "none" }}>
          <Flex alignItems={"flex-start"} justifyContent="flex-end">
            <Image
              // src="./blast/background/airdrophero.png"
              src={
                "https://raw.githubusercontent.com/devBlasttrade/image-repo/master/airdrophero.png"
              }
              alt="blast landing"
              width={"100%"}
            />
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default airdrop;
