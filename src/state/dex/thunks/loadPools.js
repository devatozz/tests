import { createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import PancakePair from "src/abis/PancakePair.json";

const loadPools = createAsyncThunk("dex/pool", async (_payload, { getState }) => {
    const state = await getState();
    const selectedChain = state.chain.selectedChain;
    const dexLoaded = state.dex.loaded;
    if (!selectedChain || !dexLoaded) {
        return { error: true, message: 'not loaded' };
    }
    try {
        const factoryContract = state.dex.factory.contract;
        const totalPairs = await factoryContract.allPairsLength();

        let pairsLength = totalPairs.toNumber()
        let pairPromises = [];

        for (let i = 0; i < pairsLength; i++) {
            pairPromises.push(factoryContract.allPairs(BigNumber.from(i)));
        }

        const pairs = await Promise.all(pairPromises)
        
        pairPromises = [];
        for (let i = 0; i < pairs.length; i++) {
            pairPromises.push(getPairData(pairs[i]));
        }

        const listResult = await Promise.all(pairPromises)
        let objResult = {}
        for (let i = 0; i < pairs.length; i++) {
            objResult[pairs[i]] = listResult[i]
        }
        let { tokens, poolMap } = await mapPools(listResult);
        return { error: false, list: listResult, obj: objResult, poolMatrix: poolMap, tokenSet: tokens  };
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
                } else {
                    poolMatrix[token1][token2] = [poolInfo];
                }
            } else {
                poolMatrix[token1] = {};
                poolMatrix[token1][token2] = [poolInfo];
            }

            if (poolMatrix.hasOwnProperty(token2)) {
                if (poolMatrix[token2].hasOwnProperty(token1)) {
                    poolMatrix[token2][token1].push(poolInfo);
                } else {
                    poolMatrix[token2][token1] = [poolInfo];
                }
            } else {
                poolMatrix[token2] = {};
                poolMatrix[token2][token1] = [poolInfo];
            }
            if (index == array.length - 1) resolve();
        });
    });
    
    await matrixP.finally();

    return { tokens: Array.from(tokenSet), poolMap: poolMatrix }
}

function getPairContract(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(address, PancakePair.abi, provider);
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