import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { config } from "src/state/chain/config";
import PiraRouter from "src/abis/PiraRouter.json";
import PiraFactory from "src/abis/PiraFactory.json";

const loadContracts = createAsyncThunk("dex/contract", async (_payload) => {
    const { dexAddress, factoryAddress } = config.base;
    const provider = new ethers.providers.JsonRpcProvider(config.base.rpcAddress);
    const dex = new ethers.Contract(dexAddress, PiraRouter.abi, provider);
    const factory = new ethers.Contract(factoryAddress, PiraFactory.abi, provider);

    return { dex: dex, factory: factory }
})
export default loadContracts;