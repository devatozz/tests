import { createSlice } from "@reduxjs/toolkit";
import { noneAddress } from "./config";
import connectToWallet from "./thunks/connectWallet";

const initialState = {
    isConnecting: false,
    isSwitching: false,
    selectedChain: "",
    availableChains: ["base"],
    account: "",
    web3Loaded: false,
    isInstalledMetamask: false
}

export const slice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        select: (state, action) => {
            state.chain = action.payload;
        },
        disconnectNetwork: (state, _action) => {
            state.account = "";
            state.web3Loaded = false;
            state.selectedChain = "";
        },
        setIsInstalledMetamask: (state, action) => {
            state.isInstalledMetamask = action.payload;
        },
        handleEthereumAccountChange: (state, action) => {
            state.account = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(connectToWallet.pending, (state) => {
            state.isConnecting = true
            state.web3Loaded = false
        }),
        builder.addCase(connectToWallet.fulfilled, (state, action) => {
            state.account = action.payload.account;
            state.selectedChain = action.payload.chain;
            
            state.web3Loaded = true;
            state.isConnecting = false
        })
    }
})

export const {
    select,
    setIsInstalledMetamask,
    disconnectNetwork,
    handleEthereumAccountChange
} = slice.actions;
export default slice.reducer;