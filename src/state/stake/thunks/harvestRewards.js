import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import stakeNftAbi from "src/abis/PiraStakingNFT.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

// Define your async thunk
export const harvestRewards = createAsyncThunk(
  "stake/harvestRewards",
  async () => {
    try {
      const stakingAddress = BaseConfig.stakeNft;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftStaking = new ethers.Contract(
        stakingAddress,
        stakeNftAbi,
        signer
      );
      const tx = await nftStaking.harvest();
      await tx.wait();
    } catch (error) {
      console.error(error);
      throw Error("Failed to harvest rewards");
    }
  }
);
