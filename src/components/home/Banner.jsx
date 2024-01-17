import React, { useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { Link, animateScroll as scroll } from "react-scroll";
import NextLink from "next/link";
import TradingViewWidget from "src/components/home/PriceSlider";
export default function Banner() {
  const TRADING_INFO = [
    {
      icon: "/blast/des-user.png",
      title: "Smart Account",
      des: "Connect using your Web3 wallets or log in with your social accounts",
    },
    {
      icon: "/blast/des-market.png",
      title: "Diverse Markets",
      des: "Trade well-known digital assets, metals, and commodities with deep liquidity",
    },
    {
      icon: "/blast/des-yeild.png",
      title: "Native Yield",
      des: "Blast Trade is built on Blast - The L2 with natively rebasing ETH and USDB",
    },
    {
      icon: "/blast/des-oracle.png",
      title: "Oracle-based Price",
      des: "Enjoy the most accurate price for all markets thanks to the oracle technology",
    },
    {
      icon: "/blast/des-fee.png",
      title: "Optimized Fees",
      des: "Enter or close a position with just a 0.03% trading fee",
    },
    {
      icon: "/blast/des-gov.png",
      title: "Governance",
      des: "You, the protocol user, decide the future of Blast Trade",
    },
  ];

  const TRADING_STATS = [
    {
      image: "/blast/chart.png",
      title: "Total Trading Volume",
      subTitle: "$157,644,372"
    },
    {
      image: "/blast/volume.png",
      title: "Open Interest",
      subTitle: "$214,690,655"
    },
    {
      image: "/blast/user.png",
      title: "Total Users",
      subTitle: "342,212"
    }
  ]

  const ScrollToTopButton = () => {
    return (
      <Link
        to="top"
        spy={true}
        smooth={true}
        duration={500}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="50px"
          height="50px"
          borderRadius="8px"
          cursor="pointer"
        >
          <ChevronUpIcon boxSize={{ md: "8", base: "6" }} color={"#EEEE06"} />
        </Box>
      </Link>
    );
  };
  return (
    <Box
      m={0}
      w={"100%"}
      p={"0px"}
      bg="linear-gradient(180deg, #12140D 0%, #15170E 51.04%, #22281A 100%);"
    >
      {/* hero view  */}

      <Flex
        alignItems={"center"}
        position={"relative"}
        p={{ base: "40px 0", md: "0px 0" }}
        // backgroundImage="url('./bgSection2.png') "
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Container
          maxW={"90%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={{ md: "row", base: "column-reverse" }}
        >
          <Stack
            as={Box}
            spacing={{ base: '20px', md: 12 }}
            py={{ md: 12, lg: 36 }}
          >
            <Box align={"center"}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "32px", xl: "50px", "2xl": "70px" }}
                lineHeight={{ "2xl": "90px", base: "32px", "xl": "65px" }}
                color={"#EEEE06"}
                textAlign={{ md: "left", base: "left" }}
                fontFamily="Lakes"
              >
                Decentralized <br /> Perpetual Exchange <br /> With Native Yield
              </Heading>
            </Box>

            <Box align={"center"}>
              <Text
                color={"#FCFDC7"}
                fontSize={{ base: "16px", xl: "20px", "2xl": "22px" }}
                lineHeight={{ base: "19px", xl: "22px", "2xl": "28px" }}
                fontFamily="Lakes"
                maxW={{ md: "817", base: "100%" }}
                fontStyle={"normal"}
                textAlign={{ md: "left", base: "left" }}
                fontWeight={600}
              >
                Trade up to 50x leverage with USDB - The Blast's auto-rebasing
                stablecoin while watching your assets compound automatically.
              </Text>
            </Box>

            <Flex
              align={{ md: "center" }}
              justify={{ md: "flex-start", base: "flex-start" }}
              pt={{ md: 8 }}
              gap={30}
              flexDirection={{ md: "row", base: "column" }}
            >
              <NextLink href={""} target={"_blank"}>
                <Button
                  backgroundColor={"#FCFC05"}
                  transition="background-color 0.3s ease-in-out"
                  _hover={{
                    bg: "#fff",
                  }}
                  style={{
                    // fontWeight: "bold",
                    fontSize: "20px",
                    borderRadius: "4px",
                    padding: "16px 32px",
                    fontFamily: "Lakes",
                    fontWeight: "700"
                  }}
                  height={{ base: "45px", md: "60px" }}
                // onClick={onComingSoonOpen}
                >
                  <Text color={"#000"}>Launch App</Text>
                </Button>
              </NextLink>

              <Box display={{ base: "none", md: "block" }}>
                <NextLink href={""} target={"_blank"} >
                  <Button

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
                    <Text color={"#FCFDC7"}>Learn More</Text>
                  </Button>
                </NextLink>
              </Box>

            </Flex>
          </Stack>

          <Flex
            width={{ md: "750px", base: "100%" }}
            alignItems="center"
            justifyContent="center"
            marginLeft={{ md: "20px", base: "0px" }}
            padding={{ md: "20px", base: "10px" }}
            background={""}
            borderRadius={{ md: "12px", base: "8px" }}
          >
            <video
              src="/blast/new_11.webm"
              alt="zk perp"
              s
              width={{ md: "750px", base: "100%" }}
              autoPlay
              muted
              loop
            />
          </Flex>
        </Container>
      </Flex>

      {/* info view  */}
      <Box
        h={{ xl: "312px", base: "100%" }}
        py={{ xl: "0px", base: "40px" }}
        bg="#22281A"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={30}
      >
        <Box
          width={{ base: "90%" }}
          display={"flex"}
          justifyContent={{ base: "center" }}
          alignContent={{ base: "center", xl: "space-between" }}
          alignItems={"center"}
          gap={{ base: 30 }}
          flexDirection={{ xl: "row", base: "column" }}
        >
          {
            TRADING_STATS.map(item =>
              <Box
                borderRadius={"8px"}
                border={"1px solid #FCFDC7"}
                height={"170px"}
                width={"100%"}
                paddingX={"20px"}
                display={"flex"}
                justifyContent={{ base: "center", xl: "" }}
              >
                <Box
                  height={"100%"}
                  minW={{ base: "300px", xl: "" }}
                  display={"flex"}
                  justifyContent={{ base: "flex-start", xl: "center" }}
                  alignItems={"center"}
                  gap={{ base: 30 }}>

                  <Box width={{ "2xl": "84px", xl: "63px", base: "55px" }} height={{ "2xl": "84px", xl: "63px", base: "55px" }}>
                    <Image src={item.image} alt="zk infor" />
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"left"}
                    flexDirection={"column"}
                    gap={"15px"}
                    width={"fit-content"}
                  >
                    <Text
                      color={"#FCFDC7"}
                      fontSize={{ base: "13px", md: "18px", "2xl": "18px" }}
                      fontWeight={{ base: "400", md: "700" }}
                      lineHeight={{ base: "19px", xl: "22px", "2xl": "28px" }}
                      fontFamily="Lakes"
                      fontStyle={"normal"}
                    >
                      {item.title}
                    </Text>
                    <Text
                      color={"#FCFDC7"}
                      fontSize={{ base: "20px", md: "26px", "xl": "28px" }}
                      fontWeight={{ base: "500", md: "700" }}
                      lineHeight={{ base: "18px", xl: "22px", "2xl": "28px" }}
                      fontFamily="Lakes"
                      fontStyle={"normal"}
                    >
                      {item.subTitle}
                    </Text>
                  </Box>
                </Box>
              </Box>
            )
          }

        </Box>
      </Box>
      {/* Trading, the way it should be */}
      <Box width={"90%"} margin={"0px auto"}>
        <Text
          color={"#FCFDC7"}
          fontSize={{ base: "28px", md: "30px" }}
          fontWeight={{ base: "700" }}
          lineHeight={{ base: "36px" }}
          fontFamily="Lakes"
          fontStyle={"normal"}
          paddingTop={{ md: "60px", base: "40px" }}
        >
          Trading, the way <br /> it should be
        </Text>
        <Text
          color={"#C3D3A5"}
          fontSize={{ base: "15px", md: "26px" }}
          lineHeight={{ base: "20px", md: "26px" }}
          fontFamily="Lakes"
          fontStyle={"normal"}
          fontWeight={{ base: "500", md: "600" }}
          paddingTop={{ md: "20px", base: "10px" }}
        >
          Pov: You are etering the trading platform designed for all.
        </Text>

        <Box>
          <SimpleGrid
            columns={{ md: "3", base: "1" }}
            spacing={{ base: "40px" }}
            paddingTop={{ md: "60px", base: "80px" }}
            paddingBottom={{ md: "60px", base: "40px" }}
          >
            {TRADING_INFO.map((item, index) => (
              <Box key={item.title}>
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={{ base: 'center', md: "center" }}
                  gap={"20px"}
                >
                  <Image
                    src={item.icon}
                    alt="blast icon"
                    width={{ md: "45px", base: "60px" }}
                  />
                  <Box display={'grid'} gap={'8px'}>
                    <Text
                      color={"#FCFDC7"}
                      fontSize={{ base: "22px", md: "30px" }}
                      fontWeight={{ base: "600", md: "700" }}
                      lineHeight={{ base: "29px", md: "30px" }}
                      fontFamily="Lakes"
                      fontStyle={"normal"}
                    >
                      {item.title}
                    </Text>
                    <Text
                      color={"#C3D3A5"}
                      fontSize={{ base: "14px", md: "18px" }}
                      fontWeight={{ base: "200", md: "600" }}
                      lineHeight={{ base: "16px", md: "20px" }}
                      fontFamily="Lakes"
                      fontStyle={"normal"}
                      width={{ md: "80%", base: "100%" }}
                    >
                      {item.des}
                    </Text>
                  </Box>
                </Box>

                {/* hide subtitle on mobile */}
                <Text
                  display={{ base: 'none', md: '' }}
                  color={"#C3D3A5"}
                  fontSize={{ base: "14px", md: "18px" }}
                  fontWeight={{ base: "200", md: "600" }}
                  lineHeight={{ base: "16px", md: "20px" }}
                  fontFamily="Lakes"
                  fontStyle={"normal"}
                  paddingTop={{ md: "20px", base: "10px" }}
                  paddingBottom={"30px"}
                  width={{ md: "80%", base: "100%" }}
                >
                  {item.des}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      {/* Multiple market */}
      <Box
        width={"90%"}
        margin={"0px auto"}
        textAlign={"center"}
        paddingY={{ base: "40px", md: "10px" }}
      >
        <Text
          color={"#FCFDC7"}
          fontSize={{ base: "16px", md: "30px" }}
          fontWeight={{ base: "500", md: "700" }}
          lineHeight={{ base: "19px", md: "30px" }}
          fontFamily="Lakes"
          fontStyle={"normal"}
          paddingTop={{ md: "60px", base: "10px" }}
          paddingBottom={{ md: "20px", base: "10px" }}
        >
          MULTIPLE MARKETS
        </Text>
        <Text
          color={"#FCFC05"}
          fontSize={{ base: "28px", md: "55px" }}
          fontWeight={{ base: "800", md: "700" }}
          lineHeight={{ base: "36px", md: "60px" }}
          fontFamily="Lakes"
          fontStyle={"normal"}
          paddingTop={{ md: "20px", base: "10px" }}
          paddingBottom={{ md: "60px", base: "20px" }}
        >
          Secured by <br /> industry-leading oracles
        </Text>
        {/* trading view  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TradingViewWidget />
        </Box>
      </Box>
      {/* earn 4 time */}
      <Box
        width={"90%"}
        margin={"0px auto"}
        textAlign={{ md: "left", base: "center" }}
        paddingY={{ base: "20px", md: "60px" }}
      >
        <Text
          color={"#FCFDC7"}
          fontSize={{ base: "28px", md: "30px" }}
          fontWeight={{ base: "700" }}
          lineHeight={{ base: "33px", md: "30px" }}
          fontFamily="Lakes"
          align={{ base: 'start', md: 'center' }}
          paddingTop={{ md: "60px", base: "40px" }}
        >
          Earn 4 times yield on Blast Trade
        </Text>
        <Text
          color={"#C3D3A5"}
          fontSize={{ base: "15px", md: "22px" }}
          fontWeight={{ base: "500", md: "700" }}
          lineHeight={{ base: "19px", md: "26px" }}
          fontFamily="Lakes"
          align={{ base: 'start', md: 'center' }}
          paddingTop={{ md: "20px", base: "10px" }}
        >
          Big brains know how to maximize their yields with the protocol.
        </Text>
        <Box padding={{ base: "40px 0px" }}>
          <Image src="/blast/tokennomics.png" alt="blast chart" />
          <Image
            paddingTop={{ base: "40px", md: '20px' }}
            src="/blast/line.png"
            alt="blast chart"
          />
        </Box>
      </Box>
      {/* here come */}
      <Box
        width={"90%"}
        margin={"0px auto"}
        textAlign={{ md: "left", base: "center" }}
        paddingY={{ base: "20px", md: "20px" }}
      >
        {/* show title desktop */}
        <Text
          display={{ base: 'none', md: '' }}
          color={"#FCFDC7"}
          fontSize={{ base: "26px", md: "30px" }}
          fontWeight={{ base: "300", md: "700" }}
          lineHeight={{ base: "30px", md: "30px" }}
          fontFamily="Lakes"
          fontStyle={"normal"}
        >
          Here comes the Governance and LP tokens
        </Text>
        {/* show title mobile */}
        <Text
          display={{ base: '', md: 'none' }}
          color={"#FCFDC7"}
          fontSize={{ base: "28px", md: "30px" }}
          fontWeight={{ base: "700" }}
          lineHeight={{ base: "33px" }}
          align={'start'}
          fontFamily="Lakes"
        >
          Two tokens create <br />
          our ecosystem
        </Text>

        <SimpleGrid
          columns={{ md: "2", base: "1" }}
          spacing={{ md: "40px", base: "30px" }}
          paddingTop={{ md: "60px", base: "40px" }}
          paddingBottom={{ md: "60px", base: "40px" }}
        >
          <Box
            border={"1px solid #FCFDC7"}
            padding={{ md: "40px", base: "20px" }}
            borderRadius={"12px"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={{ base: "16px", xl: 0 }}
            >
              <Box >
                <Image
                  src="/blast/bmx.png"
                  alt="blast icon"
                  width={{ base: "80%", md: "100%" }}
                />
              </Box>
              <NextLink href={""} target={"_blank"}>
                <Button
                  backgroundColor={"transparent"}
                  transition="background-color 0.3s ease-in-out"
                  border={"1px solid #FCFDC7"}
                  _hover={{
                    bg: "rgba(195, 211, 165, 0.2)",
                  }}
                  display={{ md: "flex", base: "none" }}
                  padding={{ base: "8px 20px", md: "16px 32px" }}
                  style={{
                    // fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "4px",
                    fontFamily: "Lakes",
                    fontWeight: "200",
                  }}
                  height={"45px"}
                // onClick={onComingSoonOpen}
                >
                  <Text color={"#FCFDC7"}> Learn More</Text>
                </Button>
              </NextLink>
            </Box>

            <Text
              color={"#C3D3A5"}
              fontSize={{ base: "14px", xl: "22px" }}
              fontWeight={{ base: "500", md: "700" }}
              lineHeight={{ base: "18px", md: "26px" }}
              fontFamily="Lakes"
              fontStyle={"normal"}
              paddingTop={{ md: "20px", base: "20px" }}
              paddingBottom={"30px"}
              width={{ md: "100%", base: "100%" }}
              height={{ md: "100px", base: "90px" }}
              textAlign={"left"}
            >
              BMX functions as both the utility and governance token,
              accumulating 30% of the protocol's generated fees.
            </Text>

            <NextLink href={""} target={"_blank"}>
              <Button
                display={{ md: "none" }}
                backgroundColor={"transparent"}
                transition="background-color 0.3s ease-in-out"
                border={"1px solid #FCFDC7"}
                width={"100%"}
                _hover={{
                  bg: "rgba(195, 211, 165, 0.2)",
                }}
                marginTop={"20px"}
                padding={{ base: "12px 20px", md: "16px 32px" }}
                style={{
                  borderRadius: "4px",
                  fontFamily: "Lakes",
                  fontWeight: "200",
                }}
                fontSize={{ base: '14px', md: '16px' }}
                height={{ base: "30px", md: "45px" }}
              // onClick={onComingSoonOpen}
              >
                <Text color={"#FCFDC7"}> Learn More</Text>
              </Button>
            </NextLink>
          </Box>
          <Box
            border={"1px solid #FCFDC7"}
            padding={{ md: "40px", base: "20px" }}
            borderRadius={"12px"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box>
                <Image
                  src="/blast/blp.png"
                  alt="blast icon"
                  width={{ base: "80%", md: "100%" }}
                />
              </Box>
              <NextLink href={""} target={"_blank"}>
                <Button
                  backgroundColor={"transparent"}
                  transition="background-color 0.3s ease-in-out"
                  border={"1px solid #FCFDC7"}
                  _hover={{
                    bg: "rgba(195, 211, 165, 0.2)",
                  }}
                  display={{ md: "flex", base: "none" }}
                  padding={{ base: "8px 20px", md: "16px 32px" }}
                  style={{
                    // fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "4px",
                    fontFamily: "Lakes",
                    fontWeight: "200",
                  }}
                  height={"45px"}
                // onClick={onComingSoonOpen}
                >
                  <Text color={"#FCFDC7"}> Learn More</Text>
                </Button>
              </NextLink>
            </Box>
            <Text
              color={"#C3D3A5"}
              fontSize={{ base: "14px", xl: "22px" }}
              fontWeight={{ base: "300", md: "700" }}
              lineHeight={{ base: "16px", md: "26px" }}
              fontFamily="Lakes"
              fontStyle={"normal"}
              paddingTop={{ md: "20px", base: "20px" }}
              paddingBottom={"30px"}
              width={{ md: "100%", base: "100%" }}
              textAlign={"left"}
              height={{ md: "100px", base: "90px" }}
            >
              BLP serves as the liquidity provider token for markets, gathering
              70% of the fees generated by the protocol.
            </Text>
            <NextLink href={""} target={"_blank"}>
              <Button
                backgroundColor={"transparent"}
                transition="background-color 0.3s ease-in-out"
                border={"1px solid #FCFDC7"}
                width={"100%"}
                _hover={{
                  bg: "rgba(195, 211, 165, 0.2)",
                }}
                display={{ md: "none", base: "block" }}
                padding={{ base: "8px 20px", md: "16px 32px" }}
                style={{
                  // fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "4px",
                  fontFamily: "Lakes",
                  fontWeight: "200",
                }}
              // onClick={onComingSoonOpen}
              >
                <Text color={"#FCFDC7"}>Learn More</Text>
              </Button>
            </NextLink>
          </Box>
        </SimpleGrid>
      </Box>
      {/* the fund */}
      <Box paddingBottom={{ base: "50px", md: "60px" }} paddingTop={{ base: "40px", md: "80px" }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            // backgroundImage={{ base: "/blast/thefund-mobile.png", xl: "/blast/thefund.png" }}
            position={'relative'}
            backgroundSize={"cover"}
            width={{ "2xl": "1244px", xl: "1201px", md: "90%", base: "90%" }}
            height={{ base: "180px", md: "600px", xl: "515px", "2xl": "533px" }}
            marginBottom={"30px"}
          >
            <img style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }} src="/blast/thefund.png" />
            <Box
              w={"100%"}
              h={"100%"}
              position={"absolute"}
              zIndex={1}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}>

              <Box
                textAlign={"center"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                gap={{ base: "10px", md: "40px" }}
              >
                <Text
                  color={"#FCFC05"}
                  fontSize={{ base: "15px", md: "45px", lg: "55px" }}
                  fontWeight={{ base: "800", md: "700" }}
                  lineHeight={{ base: "18px", md: "28px", md: "68px" }}
                  fontFamily="Lakes"
                  fontStyle={"normal"}
                  paddingTop={{ md: "40px", base: "20px" }}
                  paddingBottom={{ md: "20px", base: "0px" }}
                >
                  THE FUNDS ARE YOURS, <br /> THE YIELDS ARE OURS
                </Text>
                <Text
                  color={"#C3D3A5"}
                  fontSize={{ base: "10px", md: "14px", md: "26px" }}
                  fontWeight={{ base: "500", md: "700" }}
                  lineHeight={{ base: "14px", md: "26px" }}
                  fontFamily="Lakes"
                  fontStyle={"normal"}
                  width={{ md: "100%", base: "80%" }}
                  paddingX={{ md: "20px", lg: "40px", xl: 0 }}
                  marginBottom={{ base: '10px', md: 0 }}
                >
                  Join the community with thousands of traders, LPs, and
                  like-minded fellows.
                </Text>

                <NextLink href={""} target={"_blank"}>
                  <Button
                    backgroundColor={"#FCFDC7"}
                    transition="background-color 0.3s ease-in-out"
                    border={"1px solid #FCFDC7"}
                    _hover={{
                      bg: "#fff",
                    }}
                    borderRadius="4px"
                    fontFamily="Lakes"
                    paddingX={{ base: "7px", md: "22px" }}
                    paddingY={{ base: "4px", md: "16px" }}
                    height={{ base: "25px", md: "45px" }}
                    marginBottom={{ base: "20px" }}
                  // onClick={onComingSoonOpen}
                  >
                    <Text fontSize={{ md: "16px", base: "11px" }} color={"#000"}>
                      {" "}
                      Join The Community
                    </Text>
                  </Button>
                </NextLink>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <ScrollToTopButton />
    </Box>
  );
}
