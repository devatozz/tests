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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Tooltip } from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
// firebase
import { signInWithPopup } from "firebase/auth";
import { auth, TwitterAuthProvider, db } from "../../firebaseConfig";
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
  getDoc,
} from "firebase/firestore";
import { helperToast } from "src/lib/helpToast";
import { CheckIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, getCountFromServer } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import { useClipboard } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
const airdrop = () => {
  const toast = useToast();
  // router
  const router = useRouter();
  const { detail = [] } = router.query;
  const refCode = detail[0];

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
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [userDataOnSever, setUserDataOnSever] = useState(false);
  const [userLogout, setUserLogout] = useState(false);
  const [yourRefCount, setYourRefCount] = useState("0");
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [userRefCodeLink, setUserRefCodeLink] = useState("");
  const [appearRefcodeLink, setAppearRefCodeLink] = useState(false);

  // user infor action
  const [userInfoAction, setUserInfoAction] = useState({
    name: "",
    UID: "",
    follow: false,
    retweet: false,
    joinDiscord: false,
    wallet: "",
    image: "",
    userInviteCode: "",
  });
  const provider = new TwitterAuthProvider();
  // login
  const updateUserInfoAction = (newAction) => {
    setUserInfoAction((prevState) => ({ ...prevState, ...newAction }));
  };
  const login = () => {
    setLoadingLogin(true);
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
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

              const yourRefCode = user.uid;
              countYourRef(yourRefCode).then((count) => {
                setYourRefCount(count.toString());
              });
              createReferralUrl(yourRefCode);
              setLoadingLogin(false);
              toast({
                title: "Login success",
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
            console.error(errorCode, errorMessage);
            setIsSignedIn(false);
            setLoadingLogin(false);
            toast({
              title: "Login failed",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
          });
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  };

  // logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
        setUserLogout(true);
        setIsSignedIn(false);
        setIsFollowed(false);
        setIsRetweeted(false);
        setIsDiscord(false);
        setAppearRefCodeLink(false);
        setUserInfoAction({
          name: "",
          UID: "",
          follow: false,
          retweet: false,
          joinDiscord: false,
          wallet: "",
          image: "",
        });
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
  // get invite count
  async function countYourRef(yourCode) {
    const itemsRef = collection(db, "blasttrade_user");
    const q = query(itemsRef, where("invitedCode", "==", yourCode));
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;
    console.log(`Count of items with invite code ${yourCode}: ${count}`);
    return count;
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
            title: "Submit failed",
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
            userRefCount: "",
            yourCode: userInfoAction.UID,
            invitedCode: refCode,
          });
          setTimeout(() => {
            setLoadingSubmit(false);
            setIsSubmit(true);
            createReferralUrl(userInfoAction.UID);

            toast({
              title: "Submit success",
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
      setValidateMess("Invalid input");
      return false;
    }
    if (regex.test(str)) {
      setValidateMess("");
      return true;
    } else {
      setValidateMess("Please enter a valid Ethereum address");
      return false;
    }
  }
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setUserWallet(inputValue);
    const valis = isValidETHAddress(inputValue);
    setIsValidAddress(valis);
  };
  // handle get user info by UID
  async function getUserDataByUID(UID) {
    const walletsRef = collection(db, "blasttrade_user");
    const q = query(walletsRef, where("UID", "==", UID));
    const querySnapshot = await getDocs(q);
    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });
    return userData;
  }
  function createReferralUrl(uid) {
    let baseUrl = window.location.origin;
    // baseUrl = "http://localhost:3010" ? "http://localhost:3010" : "https://app.zkperp.tech";
    const referralUrl = `${baseUrl}/airdrop/${uid}`;
    setUserRefCodeLink(referralUrl);
    return referralUrl;
  }
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsSignedIn(true);
        // Fetch additional user data from Firestore

        const userData = await getUserDataByUID(user.uid);
        // Update userInfo state with both auth and Firestore data
        if (userData) {
          setUserInfoAction({
            name: user.displayName,
            UID: user.uid,
            follow: userData.follow,
            retweet: userData.retweet,
            joinDiscord: userData.joinDiscord,
            wallet: userData.wallet,
            image: user.photoURL,
          });
          const yourRefCode = user.uid;
          countYourRef(yourRefCode).then((count) => {
            setYourRefCount(count.toString());
          });
          createReferralUrl(yourRefCode);
          setUserDataOnSever(true);
          setAppearRefCodeLink(true);
        } else {
          setUserInfoAction({
            name: user.displayName,
            UID: user.uid,
            follow: false,
            retweet: false,
            joinDiscord: false,
            wallet: "",
            image: user.photoURL,
          });
        }
      } else {
        setIsSignedIn(false);
        setUserInfoAction(null);
        setUserDataOnSever(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [userLogout]);
  // get total user

  useEffect(() => {
    const collectionRef = collection(db, "blasttrade_user");
    getCountFromServer(collectionRef)
      .then((snapshot) => {
        const count = snapshot.data().count;
        setTotalItemCount(count);
      })
      .catch((error) => {
        console.error("Error getting document count:", error);
      });
  }, [isSubmit]);

  const [copyValue, setCopyValue] = useState(userRefCodeLink || "");
  const { onCopy, hasCopied } = useClipboard(copyValue);
  useEffect(() => {
    setCopyValue(userRefCodeLink || "");
  }, [userRefCodeLink]);
  return (
    <Box bg={"#22281a"}>
      <Box
        // backgroundImage="url('./blast/background/tradebackground.svg') "
        backgroundImage="url(https://raw.githubusercontent.com/devBlasttrade/image-repo/patch-1/bg2.jpg)"
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        width={"100%"}
        height={"fit-content"}
        padding={{ base: "10px", md: "30px" }}
      >
        <Box
          maxW={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          flexDirection={"row"}
          paddingY={"20px"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={{ md: "flex-end" }}
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
                marginTop={{ base: "10px", md: "30px" }}
              >
                Ecosystem Airdrop
              </Heading>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={"10px"}
                marginTop={{ base: "10px", md: "20px" }}
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
                  marginTop={{ base: "20px 15px", md: "20px 20px" }}
                >
                  Airdrop
                </Text>
              </Box>
              <Box
                bg={"#22281a"}
                borderRadius={"12px"}
                width={{ xl: "90%", md: "100%", base: "100%" }}
                height={"fit-content"}
                marginTop={{ base: "10px", md: "20px" }}
                padding={{ base: "10px", md: "30px" }}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  gap={"12px"}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  {userInfoAction && userInfoAction.UID !== "" && (
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-end"}
                      gap={{ base: "10px", md: "20px" }}
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
                        color={"#FCFDC7"}
                        fontSize={{ base: "12px", md: "24px" }}
                        fontWeight={{ base: "300", md: "400" }}
                        lineHeight={{ base: "19px", md: "28px" }}
                        fontFamily="Lakes"
                      >
                        {userInfoAction?.name}
                      </Text>

                      <Text
                        color={"#fff"}
                        fontSize={{ base: "12px", md: "24px" }}
                        fontWeight={{ base: "300", md: "400" }}
                        lineHeight={{ base: "19px", md: "28px" }}
                        fontFamily="Lakes"
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
                </Box>

                <Text
                  color={"#fff"}
                  fontSize={{ base: "12px", md: "24px" }}
                  fontWeight={{ base: "300", md: "400" }}
                  lineHeight={{ base: "19px", md: "28px" }}
                  fontFamily="Lakes"
                  fontStyle={"normal"}
                  textAlign={{ md: "left", base: "left" }}
                  marginTop={{ base: "10px", md: "20px" }}
                  width={{ md: "100%", base: "100%" }}
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
                        fontFamily="Lakes"
                      >
                        1
                      </Text>
                    </Box>
                    <Text
                      color={"#fff"}
                      fontSize={{ base: "12px", md: "24px" }}
                      fontWeight={"500"}
                      fontFamily="Lakes"
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
                          backgroundColor={"#22281a"}
                          transition="background-color 0.3s ease-in-out"
                          border={"1px solid #FCFDC7"}
                          isDisabled={userDataOnSever}
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
                          <Text fontFamily="Lakes" color={"#FCFDC7"}>
                            Follow
                          </Text>
                        </Button>
                        <Box
                          height={{ base: "45px", md: "60px" }}
                          width={{ base: "45px", md: "60px" }}
                          backgroundColor={isFollowed ? "#4b553b" : "#22281a"}
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
                              color={isFollowed ? "#fcfc05" : "#75835D"}
                              fontSize={"24px"}
                            />
                          )}
                        </Box>
                      </>
                    ) : (
                      <Button
                        width={{ md: "180px", base: "120px" }}
                        backgroundColor={"#22281a"}
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
                          <Text fontFamily="Lakes" color={"#FCFDC7"}>
                            Login X
                          </Text>
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
                        fontFamily="Lakes"
                      >
                        2
                      </Text>
                    </Box>
                    <Text
                      color={"#fff"}
                      fontSize={{ base: "12px", md: "24px" }}
                      fontWeight={"500"}
                      fontFamily="Lakes"
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
                          backgroundColor={"#22281a"}
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
                          <Text fontFamily="Lakes" color={"#FCFDC7"}>
                            Retweet
                          </Text>
                        </Button>
                        <Box
                          height={{ base: "45px", md: "60px" }}
                          width={{ base: "45px", md: "60px" }}
                          backgroundColor={isRetweeted ? "#4b553b" : "#22281a"}
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
                              color={isRetweeted ? "#fcfc05" : "#75835D"}
                              fontSize={"24px"}
                            />
                          )}
                        </Box>
                      </>
                    ) : (
                      <Button
                        width={{ md: "180px", base: "120px" }}
                        backgroundColor={"#22281a"}
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
                        <Text fontFamily="Lakes" color={"#FCFDC7"}>
                          Retweet
                        </Text>
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
                        fontFamily="Lakes"
                      >
                        3
                      </Text>
                    </Box>
                    <Text
                      color={"#fff"}
                      fontSize={{ base: "12px", md: "24px" }}
                      fontWeight={"500"}
                      fontFamily="Lakes"
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
                          backgroundColor={"#22281a"}
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
                          backgroundColor={isDiscord ? "#4b553b" : "#22281a"}
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
                              color={isDiscord ? "#fcfc05" : "#75835D"}
                              fontSize={"24px"}
                            />
                          )}
                        </Box>
                      </>
                    ) : (
                      <Button
                        width={{ md: "180px", base: "120px" }}
                        backgroundColor={"#22281a"}
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
                        <Text color={"#FCFDC7"} fontFamily="Lakes">
                          Join Discord
                        </Text>
                      </Button>
                    )}
                  </Box>
                </Box>
                {/* submit */}

                <Box
                  marginTop={{ base: "10px", md: "20px" }}
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
                        fontFamily="Lakes"
                      >
                        4
                      </Text>
                    </Box>
                    <Text
                      color={"#fff"}
                      fontSize={{ base: "12px", md: "24px" }}
                      fontWeight={"500"}
                      fontFamily="Lakes"
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
                          backgroundColor={"#22281a"}
                          transition="background-color 0.3s ease-in-out"
                          border={"1px solid #FCFDC7"}
                          _hover={{
                            bg: "rgba(195, 211, 165, 0.2)",
                            color: "#000",
                          }}
                          isDisabled={
                            !isDiscord || userWallet === "" || !isValidAddress
                          }
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
                          <Text color={"#FCFDC7"} fontFamily="Lakes">
                            Submit
                          </Text>
                        </Button>
                        <Box
                          height={{ base: "45px", md: "60px" }}
                          width={{ base: "45px", md: "60px" }}
                          backgroundColor={isSubmit ? "#4b553b" : "#22281a"}
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
                              color={isSubmit ? "#fcfc05" : "#75835D"}
                              fontSize={"24px"}
                            />
                          )}
                        </Box>
                      </>
                    ) : (
                      <Button
                        width={{ md: "180px", base: "120px" }}
                        backgroundColor={"#22281a"}
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
                        <Text color={"#FCFDC7"} fontFamily="Lakes">
                          Submit
                        </Text>
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
                    marginTop={"20px"}
                    bg={"#75835d"}
                    width={"100%"}
                    borderRadius={"3px"}
                  >
                    <Input
                      type="text"
                      onChange={handleInputChange}
                      isDisabled={!isDiscord}
                      color={"#fff"}
                      placeholder={
                        userDataOnSever ? userInfoAction.wallet : "0x..."
                      }
                      fontFamily="Lakes"
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
                  <Text color={"#ef4444"} fontFamily="Lakes">
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
        </Box>
        <Box
          bg={"#22281a"}
          borderRadius={"12px"}
          width={{ xl: "92.5%", md: "100%", base: "100%" }}
          height={"300px"}
          margin={{ base: "0px auto", md: "0px auto" }}
          padding={{ base: "20px", md: "30px" }}
          border={"1px solid #FCFDC7"}
        >
          <Text
            color={"#fff"}
            fontSize={{ base: "16px", md: "30px" }}
            fontWeight={"500"}
            fontFamily="Lakes"
            paddingBottom={"20px"}
          >
            Invite friends to earn more BMX
          </Text>
          <Box
            borderTop={"1px solid #75835d"}
            padding={"20px 0px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={{ base: "row", md: "column" }}
            width={"100%"}
            height={{ base: "fit-content", md: "50px" }}
          >
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={{ base: 2, md: 6 }}
              fontSize={{ base: "12px", lg: "28px", md: "18px" }}
              color={"#91938c"}
              fontFamily="Lakes"
              width={{ base: "60%", md: "100%" }}
              alignItems={"center"}
            >
              <GridItem
                w="100%"
                h={{ base: "50px", md: "100%" }}
                display="flex"
                justifyContent="flex-start"
                alignItems={"center"}
              >
                <Text>Referral Link</Text>
              </GridItem>
              <GridItem
                w="100%"
                h={{ base: "50px", md: "100%" }}
                display="flex"
                justifyContent="flex-start"
                alignItems={"center"}
              >
                <Text>Your Referrals</Text>
              </GridItem>
              <GridItem
                w="100%"
                h={{ base: "50px", md: "100%" }}
                display="flex"
                justifyContent="flex-start"
                alignItems={"center"}
              >
                <Text>Total participants</Text>
              </GridItem>
            </Grid>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={{ base: 2, md: 6 }}
              bg={{ md: "#75835d", base: "transparent" }}
              fontSize={{ base: "12px", lg: "28px", md: "18px" }}
              color={"#91938c"}
              fontFamily="Lakes"
              width={{ base: "100%", md: "100%" }}
              marginTop={{ base: "0px", md: "20px" }}
              padding={"0px 10px"}
              height={{ base: "fit-content", md: "50px" }}
            >
              <GridItem
                h={{ base: "50px", md: "100%" }}
                display="flex"
                justifyContent="flex-start"
                alignItems={"center"}
              >
                <Box
                  fontSize={{ base: "8px", md: "14px", lg: "12px" }}
                  color={"#c3d3a5"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"10px"}
                >
                  {appearRefcodeLink && !isSubmit ? (
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      gap={"10px"}
                    >
                      <Text
                        fontSize={{ base: "8px", md: "12px", lg: "10px" }}
                        color={"#c3d3a5"}
                        wordWrap="break-word"
                        width={{
                          "2xl": "100%",
                          xl: "320px",
                          lg: "250px",
                          md: "200px",
                          base: "150px",
                        }}
                      >
                        {userRefCodeLink && userRefCodeLink}
                      </Text>
                      <IconButton
                        aria-label="Copy to clipboard"
                        icon={
                          <CopyIcon color={hasCopied ? "c3d3a5" : "#FCFDC7"} />
                        }
                        onClick={onCopy}
                        background={"transparent"}
                        _hover={{
                          background: "transparent",
                        }}
                      />
                    </Box>
                  ) : isSubmit ? (
                    ""
                  ) : (
                    <Text
                      fontSize={{ base: "8px", md: "14px", lg: "12px" }}
                      color={"#c3d3a5"}
                    >
                      Submit wallet to get your referral link{" "}
                    </Text>
                  )}
                  {isSubmit && userRefCodeLink && (
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={"10px"}
                    >
                      <Text
                        fontSize={{ base: "8px", md: "14px", lg: "12px" }}
                        color={"#c3d3a5"}
                      >
                        {userRefCodeLink}
                      </Text>
                      <IconButton
                        aria-label="Copy to clipboard"
                        icon={
                          <CopyIcon color={hasCopied ? "c3d3a5" : "#FCFDC7"} />
                        }
                        onClick={onCopy}
                        background={"transparent"}
                        _hover={{
                          background: "transparent",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </GridItem>
              <GridItem
                h={{ base: "50px", md: "100%" }}
                display="flex"
                justifyContent="flex-start"
                alignItems={"center"}
              >
                <Text>
                  {" "}
                  <span style={{ color: "#FCFDC7" }}>
                    {" "}
                    {yourRefCount && yourRefCount}
                  </span>{" "}
                </Text>
              </GridItem>
              <GridItem
                h={{ base: "50px", md: "100%" }}
                display="flex"
                justifyContent="flex-start"
                alignItems={"center"}
              >
                <Text>
                  {" "}
                  <span style={{ color: "#FCFDC7" }}>
                    {totalItemCount && totalItemCount}
                  </span>{" "}
                </Text>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default airdrop;
