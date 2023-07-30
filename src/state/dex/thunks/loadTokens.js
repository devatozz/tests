import { createAsyncThunk } from "@reduxjs/toolkit";
import PancakeERC20 from "src/abis/PancakeERC20.json";
import { config } from "src/state/chain/config";
const noneAddress = "0x0000000000000000000000000000000000000000"
import { ethers } from "ethers";
const loadTokens = createAsyncThunk("dex/token", async (_payload, { getState }) => {
    const state = await getState();
    const selectedChain = state.chain.selectedChain;
    const dexLoaded = state.dex.loaded;
    if (!selectedChain || !dexLoaded) {
        return { error: true, message: 'not enough loaded' };
    }
    try {
        let tokenSet = state.dex.tokens.set.filter(item => item != config[selectedChain].wrapAddresss);
        console.log(tokenSet)
        let tokenPromises = []
        for (let i = 0; i < tokenSet.length; i++) {
            tokenPromises.push(getTokenData(tokenSet[i]));
        }
        let listResult = await Promise.all(tokenPromises);
        listResult.unshift({
            address: noneAddress,
            name: "ETH",
            symbol: "ETH",
            decimals: 18
        })
        let tokenObj = {}
        for (let i = 0; i < listResult.length; i++) {
            tokenObj[listResult[i].address] = listResult[i]
        }
        return { error: false, list: listResult, obj: tokenObj };
    } catch (e) {
        return { error: true, message: e.message };
    }
})

function getTokenContract(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(address, PancakeERC20.abi, provider);
}

// // Function to get token data (name, symbol, decimals) from a token contract
async function getTokenData(tokenAddress) {
    try {
        const tokenContract = getTokenContract(tokenAddress);
        const [name, symbol, decimals] = await Promise.all([
            tokenContract.name(),
            tokenContract.symbol(),
            tokenContract.decimals(),
        ]);

        return { address: tokenAddress, name, symbol, decimals };
    } catch (error) {
        console.error('Error fetching token data:', error);
        throw error;
    }
}

// // Function to get all token data and balance of a user
// async function getAllTokensDataForUser(userAddress, tokenAddresses) {
//     try {
//         const tokensData = await Promise.all(
//             tokenAddresses.map(async (tokenAddress) => {
//                 const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
//                 const balance = await tokenContract.methods.balanceOf(userAddress).call();
//                 const { name, symbol, decimals } = await getTokenData(tokenAddress);

//                 return {
//                     address: tokenAddress,
//                     balance: web3.utils.fromWei(balance, 'ether'),
//                     name,
//                     symbol,
//                     decimals,
//                 };
//             })
//         );

//         return tokensData;
//     } catch (error) {
//         console.error('Error fetching all tokens data:', error);
//         throw error;
//     }
// }

// // Function to get all pairs from Uniswap V2
// async function getAllPairs() {
//     try {
//         const uniswapV2FactoryAddress = 'UNISWAP_V2_FACTORY_ADDRESS'; // Replace with the actual Uniswap V2 Factory address
//         const uniswapV2FactoryContract = new web3.eth.Contract(UNISWAP_V2_FACTORY_ABI, uniswapV2FactoryAddress);

//         const totalPairs = await uniswapV2FactoryContract.methods.allPairsLength().call();
//         const pairs = [];

//         for (let i = 0; i < totalPairs; i++) {
//             const pairAddress = await uniswapV2FactoryContract.methods.allPairs(i).call();
//             pairs.push(pairAddress);
//         }

//         return pairs;
//     } catch (error) {
//         console.error('Error fetching pairs:', error);
//         throw error;
//     }
// }

// // Example usage
// async function main() {
//     const userAddress = 'USER_WALLET_ADDRESS';
//     const pairs = await getAllPairs();

//     const tokenAddresses = [];
//     for (const pairAddress of pairs) {
//         const pairContract = new web3.eth.Contract(UNISWAP_V2_PAIR_ABI, pairAddress);
//         const token0Address = await pairContract.methods.token0().call();
//         const token1Address = await pairContract.methods.token1().call();

//         tokenAddresses.push(token0Address, token1Address);
//     }

//     const uniqueTokenAddresses = [...new Set(tokenAddresses)];

//     try {
//         const tokensDataForUser = await getAllTokensDataForUser(userAddress, uniqueTokenAddresses);
//         console.log('Tokens Data and Balances for User:', tokensDataForUser);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();

export default loadTokens;