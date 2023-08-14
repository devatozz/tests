const testnetTokensList = [
    {
        address: "0x0000000000000000000000000000000000000000",
        name: "ETH",
        symbol: "Ether",
        decimals: 18,
        icon: "/eth.png",
        disable: false
    },
    {
        address: "0x4200000000000000000000000000000000000006",
        name: "Wrapped Ether",
        symbol: "WETH",
        decimals: 18,
        icon: "/weth.png",
        disable: false
    },
    {
        address: "0xF42C59170e9Ea38809FC9935dCED761274336C66",
        name: "FLU",
        symbol: "FLU",
        decimals: 18,
        icon: "/flu.png",
        disable: false
    },
    {
        address: "0x23719B3222837Abd564D176c78527623167BdbEc",
        name: "USDC Testnet",
        symbol: "USDC",
        decimals: 18,
        icon: "/usdc.png",
        disable: false
    },
    {
        address: "0x3F469B262124334F04D0cE45fDF8712dC723773c",
        name: "USDT Testnet",
        symbol: "USDT",
        decimals: 18,
        icon: "/usdt.png",
        disable: false
    }
]

const mainnetTokensList = [
    {
        address: "0x0000000000000000000000000000000000000000",
        name: "ETH",
        symbol: "Ether",
        decimals: 18,
        icon: "/eth.png",
        disable: false
    },
    {
        address: "0x4200000000000000000000000000000000000006",
        name: "Wrapped Ether",
        symbol: "WETH",
        decimals: 18,
        icon: "/weth.png",
        disable: false
    },
    {
        address: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
        name: "Axelar Wrapped USDC",
        symbol: "axlUSDC",
        decimals: 6,
        icon: "/usdc.png",
        disable: false
    },
    {
        address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
        name: "USD Base Coin",
        symbol: "USDbC",
        decimals: 6,
        icon: "/usdc.png",
        disable: false
    }
    // {
    //     address: "0x7133d274BA9BC6980f31cCBD2cc4E975D6E04879",
    //     name: "FLU Bot",
    //     symbol: "FLUB",
    //     decimals: 18,
    //     icon: "/flu.png",
    //     disable: false
    // }
]

const tokensList = process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? mainnetTokensList : testnetTokensList

export default async function handler(_req, res) {
    try {
        
        return res.json({ result: tokensList, error: false });
    } catch (error) {
        return res.status(500).json({ error: true, output: "not found" });
    }
}

