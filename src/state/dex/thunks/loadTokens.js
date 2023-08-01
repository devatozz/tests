import { createAsyncThunk } from "@reduxjs/toolkit";
import PancakeERC20 from "src/abis/PancakeERC20.json";
import { config } from "src/state/chain/config";
import { ethers } from "ethers";
const loadTokens = createAsyncThunk("dex/token", async (_payload, { getState }) => {
    // const state = await getState();
    // const selectedChain = state.chain.selectedChain ? state.chain.selectedChain : "base";
    // const dexLoaded = state.dex.loaded;
    // if (!dexLoaded) {
    //     return { error: true, message: 'not enough loaded' };
    // }
    try {
        // let tokenSet = state.dex.tokens.set;
        // let tokenPromises = []
        // for (let i = 0; i < tokenSet.length; i++) {
        //     tokenPromises.push(getTokenData(tokenSet[i]));
        // }
        // let listResult = await Promise.all(tokenPromises);
        // let itemIndex = listResult.findIndex(item => item.address.toLocaleLowerCase() == config[selectedChain].wrapAddress.toLocaleLowerCase())
        // if (itemIndex != -1) {
        //     listResult[itemIndex].name = "ETH"
        //     listResult[itemIndex].symbol = "ETH"
        // }
        let listResultReq = await fetch("/api/tokens")
        let listResult = (await listResultReq.json()).result
        let tokenObj = {}
        for (let i = 0; i < listResult.length; i++) {
            tokenObj[listResult[i].address] = listResult[i]
        }
        return { error: false, list: listResult, obj: tokenObj };
    } catch (e) {
        console.log(e)
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

export default loadTokens;