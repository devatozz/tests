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
      bgGradient="linear-gradient(90.07deg, #EBDE8E -8.17%, #F3E4AC 7.41%, #F4E6B2 10.41%, #FFEEDA 31.13%, #FFF0DD 31.14%, #FFF2E3 36.77%, #FFFFFF 53.39%, #CBFDF6 61.33%, #93FBED 69.86%, #8AF7E8 76.91%, #62E6D4 106.87%)"
      p={20}
      justifyContent="center"
      alignContent="center"
      h={{ base: "calc(100vh - 50px)" }}
    >
      <CircularProgress isIndeterminate color="blue.600" />
    </Center>
  );

  const pageMarkup = isLoading || !ready ? loadingPageMarkup : actualPageMarkup;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href={favicon.src} />
        <meta name="title" content="ZkPerp" />
        <meta
          name="description"
          content="Trade without boundaries powered by Scroll"
        />
        <title>ZkPerp Dex</title>
      </Head>
      <ChakraProvider theme={theme}>
        <AppBar />
        {pageMarkup}
        <Footer />
      </ChakraProvider>
    </CacheProvider>
  );
}
