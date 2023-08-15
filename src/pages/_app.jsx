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
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { base, baseGoerli } from 'wagmi/chains'

const chains =  process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? [base] : [baseGoerli]
const projectId = "96bcecdf82d8249323221c7fa8ac7707"

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

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
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
          'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
          '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
        ]}
      />
    </CacheProvider>
  );
}
