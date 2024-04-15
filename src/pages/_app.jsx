import React, { useEffect, useState } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "src/createEmotionCache";
import favicon from "src/public/static/favicon.ico";
const clientSideEmotionCache = createEmotionCache();
import "../styles/global.css";
import theme from "src/styles/theme";
import { ChakraProvider, CircularProgress, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppBar from "src/components/layout/AppBar";
import Footer from "src/components/layout/Footer";
import Fonts from "src/styles/Fonts";
export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setIsLoading(true));
    Router.events.on("routeChangeComplete", () => setIsLoading(false));
  }, [Router]);

  useEffect(() => {
    setReady(true);
  }, []);
  const actualPageMarkup = <Component {...pageProps} />;

  const loadingPageMarkup = (
    <Center
      w="100vw"
      boxShadow="lg"
      p={20}
      justifyContent="center"
      alignContent="center"
      h={{ base: "calc(100vh - 50px)" }}
      bg={"#000000"}
    >
      <CircularProgress isIndeterminate color="#0068FF" />
    </Center>
  );

  // const pageMarkup = isLoading || !ready ? loadingPageMarkup : actualPageMarkup;
  const pageMarkup = actualPageMarkup;
  const appBarBg = Router.pathname === "/" ? "transparent" : "#000";
  const footerDisplay = Router.pathname === "/" ? false : true;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href={favicon.src} />
        <meta name="title" content="M33M Labs" />
        <meta
          name="description"
          content="We build and experiment world class products in crypto space
                  that will definitely blow your mind with abnormal DeFi models."
        />
        <title>M33M</title>
        <meta property="og:title" content="M33M Labs" />
        <meta
          property="og:description"
          content="We build and experiment world class products in crypto space
                  that will definitely blow your mind with abnormal DeFi models."
        />
        <meta property="og:image" content="/public/asset/img/Cover.png" />
        <meta property="og:url" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="M33M Labs" />
        <meta
          name="twitter:description"
          content="We build and experiment world class products in crypto space
                  that will definitely blow your mind with abnormal DeFi models."
        />
        <meta name="twitter:creator" content="" />
        <meta name="twitter:image" content="/public/asset/img/Cover.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <Fonts />
        <AppBar bg={appBarBg} />
        {pageMarkup}
        {footerDisplay && <Footer />}
      </ChakraProvider>
    </CacheProvider>
  );
}
