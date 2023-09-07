import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChain: "base",
    lastConnected: "",
}

export const slice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        connectNetwork: (state, action) => {
            state.lastConnected = action.payload
        },
        disconnectNetwork: (state, _action) => {
            state.lastConnected = ""
        },
    },
})
export const {
    connectNetwork,
    disconnectNetwork,
} = slice.actions;
export default slice.reducer;