const tokensList = [
    {
        address: "0x0000000000000000000000000000000000000000",
        name: "ETH",
        symbol: "Ether",
        decimals: 18,
        icon: "/eth.png",
        disable: false
    },
    {
        address: "0xE79598095C29c30f194406B2a14bA2b1256A713E",
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

export default async function handler(_req, res) {
    try {
        
        return res.json({ result: tokensList, error: false });
    } catch (error) {
        return res.status(500).json({ error: true, output: "not found" });
    }
}

