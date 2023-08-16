import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChain: "base",
    lastConnected: false,
}

export const slice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        connectNetwork: (state, _action) => {
            state.lastConnected = true
        },
        disconnectNetwork: (state, _action) => {
            state.lastConnected = false
        },
    },
})
export const {
    connectNetwork,
    disconnectNetwork,
} = slice.actions;
export default slice.reducer;