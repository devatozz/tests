import { createSlice } from "@reduxjs/toolkit";
import loadContracts from "./thunks/loadContract";
import loadTokens from "./thunks/loadTokens";
import loadPools from "./thunks/loadPools";
const noneAddress = "0x0000000000000000000000000000000000000000"
const initialState = {
    dex: {
        contract: null,
        signer: null,
    },
    factory: {
        contract: null,
    },
    pools: {
        list: [],
        matrix: {},
        loaded: false,
        obj: {}
    },
    loaded: false,
    isLoading: false,
    tokens: {
        set: [],
        loaded: false,
        list: [
            {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
                logo: "/eth.png",
                address: noneAddress
            }
        ],
        obj: {
            "0x0000000000000000000000000000000000000000": {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
                logo: "/eth.png",
                address: noneAddress
            }
        }
    },
}
export const slice = createSlice({
    name: 'dex',
    initialState,
    reducers: {
        select: (state, action) => {
            state.chain = action.payload;
        },

    },
    extraReducers(builder) {
        builder.addCase(loadContracts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loadContracts.fulfilled, (state, action) => {
            state.dex.contract = action.payload.dex;
            state.factory.contract = action.payload.factory;

            state.loaded = true;
            if (action.payload.isSigner) {
                state.dex.signer = action.payload.dex;
            }
        })
        builder.addCase(loadTokens.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loadTokens.fulfilled, (state, action) => {
            state.tokens.loaded = true;
            if (action.payload.error) {
                state.tokens.list = [];
                state.tokens.obj = {};
                console.log("Load tokens error: ", action.payload.message)
            } else {
                state.tokens.list = action.payload.list;
                state.tokens.obj = action.payload.obj;
            }
            state.isLoading = false
        })
        builder.addCase(loadPools.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loadPools.fulfilled, (state, action) => {
            state.pools.loaded = true;
            if (action.payload.error) {
                state.pools.list = [];
                state.pools.obj = {};
                console.log("Load tokens error: ", action.payload.message)
            } else {
                state.pools.list = action.payload.list;
                state.pools.obj = action.payload.obj;
                state.tokens.set = action.payload.tokenSet;
                state.pools.matrix = action.payload.poolMatrix;
            }
            state.isLoading = false
        })
    }
})

export const {
} = slice.actions;
export default slice.reducer;