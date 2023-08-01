const tokensList = [
    {
        address: "0xE79598095C29c30f194406B2a14bA2b1256A713E",
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
        icon: "/eth.png"
    },
    {
        address: "0xF42C59170e9Ea38809FC9935dCED761274336C66",
        name: "FLU",
        symbol: "FLU",
        decimals: 18,
        icon: "/flu.png"
    },
    {
        address: "0x23719B3222837Abd564D176c78527623167BdbEc",
        name: "USDC Testnet",
        symbol: "USDC",
        decimals: 18,
        icon: "/usdc.png"
    },
    {
        address: "0x3F469B262124334F04D0cE45fDF8712dC723773c",
        name: "USDT Testnet",
        symbol: "USDT",
        decimals: 18,
        icon: "/usdt.png"
    }
]

export default async function handler(_req, res) {
    try {
        
        return res.json({ result: tokensList, error: false });
    } catch (error) {
        return res.status(500).json({ error: true, output: "not found" });
    }
}

