import { createConfig, configureChains } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { base, baseGoerli } from 'wagmi/chains'

export const CHAINS = process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? [base] : [baseGoerli]
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
    CHAINS,
    [publicProvider()],
)

// Set up wagmi config
export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'Pira Finance',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: '5017c09986c1d07d0cf9c57fcef20ceb',
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
})
