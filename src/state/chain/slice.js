import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChain: "base",
    lastConnected: false,
}

export const slice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        disconnectNetwork: (state, _action) => {
            state.lastConnected = false
        },
    },
})
export const {
    disconnectNetwork,
} = slice.actions;
export default slice.reducer;