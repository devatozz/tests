import React, { useEffect, useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import favicon from 'src/public/static/favicon.ico';
const clientSideEmotionCache = createEmotionCache();
import '../styles/global.css';
import theme from 'src/styles/theme';
import {
  ChakraProvider,
  CircularProgress,
  Center,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store, persistor } from 'src/state/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppBar from 'src/components/layout/AppBar';
import Footer from 'src/components/layout/Footer';
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from 'src/utils/wallet';

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsLoading(true));
    Router.events.on('routeChangeComplete', () => setIsLoading(false));
  }, [Router]);

  useEffect(() => {
    setReady(true);
  }, []);
  const actualPageMarkup = <Component {...pageProps} />;

  const loadingPageMarkup = (
    <Center
      w='100vw'
      boxShadow='lg'
      bgGradient='linear(180deg, #3146C6 0%, #18215D 90%)'
      p={20}
      justifyContent='center'
      alignContent='center'
      h={{ base: 'calc(100vh - 50px)' }}
    >
      <CircularProgress isIndeterminate color='blue.600' />
    </Center>
  );

  const pageMarkup = isLoading || !ready ? loadingPageMarkup : actualPageMarkup;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='shortcut icon' href={favicon.src} />
        <meta name='title' content='Pira finance' />
        <meta
          name='description'
          content='The community-owned DEX revolutionizing decentralized finance'
        />
        <title>Pira Finance</title>
      </Head>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppBar />
            {pageMarkup}
            <Footer />
            </PersistGate>
          </Provider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}
