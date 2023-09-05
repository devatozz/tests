import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import stakeNftAbi from "src/abis/PiraStakingNFT.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export const fetchTotalRewards = createAsyncThunk(
  "stake/fetchTotalRewards",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { account } = getState().chain;
      const stakingAddress = BaseConfig.stakeNft;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftStaking = new ethers.Contract(
        stakingAddress,
        stakeNftAbi,
        signer
      );
      const totalRewards = await nftStaking.getTotalRewards(account);
      return totalRewards;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
