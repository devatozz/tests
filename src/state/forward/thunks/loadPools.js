import { createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import PiraPair from "src/abis/PiraPair.json";

const testnetPools = ["0x6e5d28ee7579b46e8b8a26a0b1832b465a4bbefa", "0x9d8c1ed350dca116be79d4e43ecc51b05ab2f759", "0x1D7D6f01e666ffd6C377cB8318A4dAcb7939eD95", "0xa9cccf283330b13e29729c4b1ec24db6b2b5eb0a"]
const mainnetPools = ["0x9A0b05F3cF748A114A4f8351802b3BFfE07100D4", "0x41d160033C222E6f3722EC97379867324567d883"]
const loadPools = createAsyncThunk("forward/pool", async (_payload, { getState }) => {
    const state = await getState();
    const selectedChain = state.chain.selectedChain ? state.chain.selectedChain : "base";
    const dexLoaded = state.forward.loaded;
    if (!selectedChain || !dexLoaded) {
        return { error: true, message: 'not loaded' };
    }
    try {
        const factoryContract = state.forward.factory.contract;
        const totalPairs = await factoryContract.allPairsLength();

        let pairsLength = totalPairs.toNumber()
        if (pairsLength > 0) {
            let pairPromises = [];
            const pairs = process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? mainnetPools : testnetPools

            pairPromises = [];
            for (let i = 0; i < pairs.length; i++) {
                pairPromises.push(getPairData(pairs[i]));
            }

            let listResult = await Promise.all(pairPromises)
            listResult = listResult.filter(item => (!item.reverses._reserve0.isZero() || !item.reverses._reserve1.isZero()))
            let objResult = {}
            for (let i = 0; i < pairs.length; i++) {
                objResult[pairs[i]] = listResult[i]
            }
            let { tokens, poolMap } = await mapPools(listResult);
            return { error: false, list: listResult, obj: objResult, poolMatrix: poolMap, tokenSet: tokens };
        } else {
            return { error: false, list: [], obj: {}, poolMatrix: {}, tokenSet: [] };
        }
    } catch (e) {
        return { error: true, message: e.message };
    }
})

const mapPools = async (data) => {
    let poolMatrix = {};
    let tokenSet = new Set();
    let matrixP = new Promise((resolve, _) => {
        data.forEach((item, index, array) => {
            let token1 = item.token0;
            let token2 = item.token1;
            tokenSet.add(token1);
            tokenSet.add(token2);
            const poolInfo = {
                pair: item.pair,
                token1: token1,
                token2: token2,
                reserve1: item.reverses._reserve0,
                reserve2: item.reverses._reserve1,
            };
            if (poolMatrix.hasOwnProperty(token1)) {
                if (poolMatrix[token1].hasOwnProperty(token2)) {
                    poolMatrix[token1][token2].push(poolInfo);
                    poolMatrix[token1.toLowerCase()][token2].push(poolInfo);
                    poolMatrix[token1][token2.toLowerCase()].push(poolInfo);
                    poolMatrix[token1.toLowerCase()][token2.toLowerCase()].push(poolInfo);
                } else {
                    poolMatrix[token1][token2] = [poolInfo];
                    poolMatrix[token1][token2.toLowerCase()] = [poolInfo];
                    poolMatrix[token1.toLowerCase()][token2] = [poolInfo];
                    poolMatrix[token1.toLowerCase()][token2.toLowerCase()] = [poolInfo];
                }
            } else {
                poolMatrix[token1] = {};
                poolMatrix[token1.toLowerCase()] = {};
                poolMatrix[token1][token2] = [poolInfo];
                poolMatrix[token1.toLowerCase()][token2] = [poolInfo];
                poolMatrix[token1][token2.toLowerCase()] = [poolInfo];
                poolMatrix[token1.toLowerCase()][token2.toLowerCase()] = [poolInfo];
            }

            if (poolMatrix.hasOwnProperty(token2)) {
                if (poolMatrix[token2].hasOwnProperty(token1)) {
                    poolMatrix[token2][token1].push(poolInfo);
                    poolMatrix[token2.toLowerCase()][token1].push(poolInfo);
                    poolMatrix[token2][token1.toLowerCase()].push(poolInfo);
                    poolMatrix[token2.toLowerCase()][token1.toLowerCase()].push(poolInfo);
                } else {
                    poolMatrix[token2][token1] = [poolInfo];
                    poolMatrix[token2.toLowerCase()][token1] = [poolInfo];
                    poolMatrix[token2][token1.toLowerCase()] = [poolInfo];
                    poolMatrix[token2.toLowerCase()][token1.toLowerCase()] = [poolInfo];
                }
            } else {
                poolMatrix[token2] = {};
                poolMatrix[token2.toLowerCase()] = {};
                poolMatrix[token2][token1] = [poolInfo];
                poolMatrix[token2.toLowerCase()][token1] = [poolInfo];
                poolMatrix[token2][token1.toLowerCase()] = [poolInfo];
                poolMatrix[token2.toLowerCase()][token1.toLowerCase()] = [poolInfo];
            }
            if (index == array.length - 1) resolve();
        });
    });
    
    await matrixP.finally();

    return { tokens: Array.from(tokenSet), poolMap: poolMatrix }
}

function getPairContract(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(address, PiraPair.abi, provider);
}

// Function to get token data (name, symbol, decimals) from a token contract
async function getPairData(pairAddress) {
    try {
        const pairContract = getPairContract(pairAddress);
        const [token0, token1, reverses] = await Promise.all([
            pairContract.token0(),
            pairContract.token1(),
            pairContract.getReserves(),
        ]);

        return { pair: pairAddress, token0: token0, token1: token1, reverses: reverses };
    } catch (error) {
        console.error('Error fetching token data:', error);
        throw error;
    }
}

export default loadPools;