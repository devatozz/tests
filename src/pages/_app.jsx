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
      p={20}
      justifyContent="center"
      alignContent="center"
      h={{ base: "calc(100vh - 50px)" }}
      bg={"#22281a"}
    >
      <CircularProgress isIndeterminate color="#fcfc05" />
    </Center>
  );

  const pageMarkup = isLoading || !ready ? loadingPageMarkup : actualPageMarkup;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href={favicon.src} />
        <meta name="title" content="Blast Trade" />
        <meta
          name="description"
          content="Perpetual trading changed forever. Synergized by Blast's native yield. 100% Blast Points + Blast Gold to traders and LPs."
        />
        <title>Blast Trade</title>
        <meta property="og:title" content="Blast Trade" />
        <meta
          property="og:description"
          content="Perpetual trading changed forever. Synergized by Blast's native yield. 100% Blast Points + Blast Gold to traders and LPs."
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blasttrade/image-repo/master/banner.png"
        />
        <meta property="og:url" content="https://www.blasttrade.org/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blast Trade" />
        <meta
          name="twitter:description"
          content="Perpetual trading changed forever. Synergized by Blast's native yield. 100% Blast Points + Blast Gold to traders and LPs."
        />
        <meta name="twitter:creator" content="@BlastTrade" />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/Blasttrade/image-repo/master/banner.png"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <AppBar />
        {pageMarkup}
        <Footer />
      </ChakraProvider>
    </CacheProvider>
  );
}
