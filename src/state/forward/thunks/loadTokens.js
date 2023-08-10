import { createAsyncThunk } from "@reduxjs/toolkit";
import PiraERC20 from "src/abis/PiraERC20.json";
import { ethers } from "ethers";
const loadTokens = createAsyncThunk("forward/token", async (_payload, { getState }) => {
    try {
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
    return new ethers.Contract(address, PiraERC20.abi, provider);
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