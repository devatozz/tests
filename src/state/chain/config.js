import ftmConfig from "src/state/config/ftm.json";
import bttcConfig from "src/state/config/bttc.json";
import avaxConfig from "src/state/config/avax.json";
import ganacheConfig from "src/state/config/ganache.json";
import baseConfig from "src/state/config/base.json";

export const noneAddress = "0x0000000000000000000000000000000000000000";

export const config = {
  // bttc: {
  //   rpcAddress: "https://pre-rpc.bt.io/",
  //   logoURL: "",
  //   wssAddress: "wss://pre-rpc.bt.io:8546",
  //   chainId: 1029,
  //   blockchainExplorer: "https://testscan.bt.io/",
  //   name: "BitTorrent Chain",
  //   nativeToken: {
  //     name: "BTT",
  //     symbol: "BTT",
  //     logo: "/bttc.png",
  //     address: noneAddress,
  //     decimals: 18,
  //   },
  //   hubAddress: bttcConfig.hub,
  //   loanAddress: bttcConfig.loan,
  //   rentalAddress: bttcConfig.rental,
  //   marketAddress: bttcConfig.market,
  // },
  // avax: {
  //   rpcAddress: "https://api.avax-test.network/ext/bc/C/rpc",
  //   logoURL: "",
  //   wssAddress: "https://api.avax-test.network/ext/bc/C/rpc",
  //   chainId: 43113,
  //   blockchainExplorer: "https://testnet.snowtrace.io/",
  //   name: "Avalanche Fuji C-Chain",
  //   nativeToken: {
  //     name: "AVAX",
  //     symbol: "AVAX",
  //     logo: "/avax.png",
  //     address: noneAddress,
  //     decimals: 18,
  //   },
  //   hubAddress: avaxConfig.hub,
  //   loanAddress: avaxConfig.loan,
  //   rentalAddress: avaxConfig.rental,
  //   marketAddress: avaxConfig.market,
  // },
  // ftm: {
  //   rpcAddress: "https://rpc.testnet.fantom.network/",
  //   logoURL: "",
  //   wssAddress: "https://rpc.testnet.fantom.network/",
  //   chainId: 4002,
  //   blockchainExplorer: "https://testnet.ftmscan.com/",
  //   name: "Fantom testnet",
  //   nativeToken: {
  //     name: "FTM",
  //     symbol: "FTM",
  //     logo: "/ftm.png",
  //     address: noneAddress,
  //     decimals: 18,
  //   },
  //   hubAddress: ftmConfig.hub,
  //   loanAddress: ftmConfig.loan,
  //   rentalAddress: ftmConfig.rental,
  //   marketAddress: ftmConfig.market,
  // },
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
    factoryAddress: baseConfig.factory,
    dexAddress: baseConfig.router,
    wrapAddress : baseConfig.wrap,
  }
};

export const chainInfos = {
  // ftm: { label: "Fantom", logo: "/ftm.png", disabled: false },
  // avax: { label: "Avalanche C Chain", logo: "/avax.png", disabled: false },
  // bttc: { label: "BitTorrent Chain", logo: "/bttc.png", disabled: false },
  base: {
    label: "Base Goerli",
    logo: "/base-logo-in-blue.png",
    disabled: false,
  },
  // ganache: {
  //   label: "Ganache",
  //   logo: "/base-logo-in-blue.png",
  //   disabled: false,
  // },
};
