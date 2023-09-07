import baseTestnetConfig from "src/state/config/base-testnet.json";
import baseMainnetConfig from "src/state/config/base-mainnet.json";
import baseForwardTestnetConfig from "src/state/config/base-forward-testnet.json";
import baseForwardMainnetConfig from "src/state/config/base-forward-mainnet.json";
export const noneAddress = "0x0000000000000000000000000000000000000000";

const TestnetConfig = {
  base: {
    rpcAddress: "https://goerli.base.org",
    logoURL: "",
    wssAddress: "https://goerli.base.org",
    chainId: 84531,
    blockchainExplorer: "https://goerli.basescan.org/",
    name: "Base Goerli",
    nativeToken: {
      name: "ETH",
      symbol: "ETH",
      logo: "/base-logo-in-blue.png",
      address: noneAddress,
      decimals: 18,
    },
    factoryAddress: baseTestnetConfig.factory,
    dexAddress: baseTestnetConfig.router,
    wrapAddress: baseTestnetConfig.wrap,
    stakeNft: baseTestnetConfig.stakeNft,
    nft: baseTestnetConfig.nft,
    nftAddress: baseTestnetConfig.nft,
    multiNftAddress: baseTestnetConfig.multiNft,

  },
};

const MainnetConfig = {
  base: {
    rpcAddress: "https://mainnet.base.org",
    logoURL: "",
    wssAddress: "https://mainnet.base.org",
    chainId: 8453,
    blockchainExplorer: "https://basescan.org",
    name: "Base",
    nativeToken: {
      name: "ETH",
      symbol: "ETH",
      logo: "/eth.png",
      address: noneAddress,
      decimals: 18,
    },
    factoryAddress: baseMainnetConfig.factory,
    dexAddress: baseMainnetConfig.router,
    wrapAddress: baseMainnetConfig.wrap,
    nftAddress: baseMainnetConfig.nft,
    multiNftAddress: baseMainnetConfig.multiNft,
  },
};

const ForwardTestnetConfig = {
  base: {
    rpcAddress: "https://goerli.base.org",
    logoURL: "",
    wssAddress: "https://goerli.base.org",
    chainId: 84531,
    blockchainExplorer: "https://goerli.basescan.org/",
    name: "Base Goerli",
    nativeToken: {
      name: "ETH",
      symbol: "ETH",
      logo: "/base-logo-in-blue.png",
      address: noneAddress,
      decimals: 18,
    },
    factoryAddress: baseForwardTestnetConfig.factory,
    dexAddress: baseForwardTestnetConfig.router,
    wrapAddress: baseForwardTestnetConfig.wrap,
    nftAddress: baseForwardTestnetConfig.nft,
    multiNftAddress: baseForwardTestnetConfig.multiNft,
  },
};

const ForwardMainnetConfig = {
  base: {
    rpcAddress: "https://mainnet.base.org",
    logoURL: "",
    wssAddress: "https://mainnet.base.org",
    chainId: 8453,
    blockchainExplorer: "https://basescan.org",
    name: "Base",
    nativeToken: {
      name: "ETH",
      symbol: "ETH",
      logo: "/eth.png",
      address: noneAddress,
      decimals: 18,
    },
    factoryAddress: baseForwardMainnetConfig.factory,
    dexAddress: baseForwardMainnetConfig.router,
    wrapAddress: baseForwardMainnetConfig.wrap,
    nftAddress: baseForwardMainnetConfig.nft,
    multiNftAddress: baseForwardMainnetConfig.multiNft,

  },
};

export const config =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? MainnetConfig : TestnetConfig;


export const forwardConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? ForwardMainnetConfig
    : ForwardTestnetConfig;


const ChainInfosTestnet = {
  base: {
    //label: "Base Goerli",
    // logo: "/base-logo-in-blue.png",
    label: "Metamask",
    logo: "/metamask-icon.png",
    disabled: false,
  },
};

const ChainInfosMainnet = {
  base: {
    // label: "Base",
    // logo: "/base-logo-in-blue.png",
    label: "Metamask",
    logo: "/metamask-icon.png",
    disabled: false,
  },
};

export const chainInfos =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? ChainInfosMainnet
    : ChainInfosTestnet;


export const walletInfos = {
  metaMask: {
    logo: "/metamask-icon.png",
  },
  coinbaseWallet: {
    logo: "/coinbase-wallet-logo.png",
  },
  walletConnect: {
    logo: "/wallet-connect-logo.png",
  },
  injected: {
    logo: "/white-wallet-photos.png",
  },
};

