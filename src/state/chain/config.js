import baseConfig from "src/state/config/base.json";

export const noneAddress = "0x0000000000000000000000000000000000000000";

export const config = {
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
