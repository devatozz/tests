import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { config } from "src/state/chain/config";
import PancakeRouter from "src/abis/PancakeRouter.json";
import PancakeFactory from "src/abis/PancakeFactory.json";

const loadContracts = createAsyncThunk("dex/contract", async (_payload, { getState }) => {
    let state = await getState();
    const { dexAddress, factoryAddress } = config[state.chain.selectedChain];

    if (state.chain.account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dex = new ethers.Contract(dexAddress, PancakeRouter.abi, signer);
        const factory = new ethers.Contract(factoryAddress, PancakeFactory.abi, provider);

        return { dex: dex, factory: factory, isSigner: true }
    } else if (state.chain.selectedChain) {
        const provider = new ethers.providers.JsonRpcProvider(config[selectedChain].rpcAddress);
        const dex = new ethers.Contract(dexAddress, PancakeRouter.abi, provider);
        const factory = new ethers.Contract(factoryAddress, PancakeFactory.abi, provider);

        return { dex: dex, factory: factory, isSigner: false }
    } else {
        const provider = new ethers.providers.JsonRpcProvider(config.ganache.rpcAddress);
        const dex = new ethers.Contract(dexAddress, PancakeRouter.abi, provider);
        const factory = new ethers.Contract(factoryAddress, PancakeFactory.abi, provider);

        return { dex: dex, factory: factory, isSigner: false }
    }
})
export default loadContracts;