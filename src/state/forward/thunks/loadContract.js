import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { forwardConfig } from "src/state/chain/config";
import PiraRouter from "src/abis/PiraRouter.json";
import PiraFactory from "src/abis/PiraFactory.json";

const loadContracts = createAsyncThunk("forward/contract", async (_payload, { getState }) => {
    const { dexAddress, factoryAddress } = forwardConfig.base;

    const provider = new ethers.providers.JsonRpcProvider(forwardConfig.base.rpcAddress);
    const dex = new ethers.Contract(dexAddress, PiraRouter.abi, provider);
    const factory = new ethers.Contract(factoryAddress, PiraFactory.abi, provider);

    return { dex: dex, factory: factory }
})
export default loadContracts;