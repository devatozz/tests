import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { config } from "src/state/chain/config";
import PiraRouter from "src/abis/PiraRouter.json";
import PiraFactory from "src/abis/PiraFactory.json";

const loadContracts = createAsyncThunk("dex/contract", async (_payload, { getState }) => {
    let state = await getState();
    if (state.chain.account) {
        const { dexAddress, factoryAddress } = config[state.chain.selectedChain];

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dex = new ethers.Contract(dexAddress, PiraRouter.abi, signer);
        const factory = new ethers.Contract(factoryAddress, PiraFactory.abi, provider);

        return { dex: dex, factory: factory, isSigner: true }
    } else if (state.chain.selectedChain) {
        const { dexAddress, factoryAddress } = config[state.chain.selectedChain];

        const provider = new ethers.providers.JsonRpcProvider(config[selectedChain].rpcAddress);
        const dex = new ethers.Contract(dexAddress, PiraRouter.abi, provider);
        const factory = new ethers.Contract(factoryAddress, PiraFactory.abi, provider);

        return { dex: dex, factory: factory, isSigner: false }
    } else {
        const { dexAddress, factoryAddress } = config.base;

        const provider = new ethers.providers.JsonRpcProvider(config.base.rpcAddress);
        const dex = new ethers.Contract(dexAddress, PiraRouter.abi, provider);
        const factory = new ethers.Contract(factoryAddress, PiraFactory.abi, provider);

        return { dex: dex, factory: factory, isSigner: false }
    }
})
export default loadContracts;