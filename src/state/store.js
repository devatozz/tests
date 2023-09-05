import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import cacheReducer from "./cache/slice";
import chainReducer from "./chain/slice";
import dexReducer from "./dex/slice";
import airdropReducer from "./airdrop/slice";
import stakeReducer from "./stake/slice";

const chainPersistConfig = {
  key: "chain",
  storage,
};

const chainPersist = persistReducer(chainPersistConfig, chainReducer);

export const store = configureStore({
  reducer: {
    // cache: cacheReducer,
    chain: chainPersist,
    dex: dexReducer,
    airdrop: airdropReducer,
    stake: stakeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
