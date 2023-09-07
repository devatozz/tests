import { createAsyncThunk } from "@reduxjs/toolkit";

import { ethers } from "ethers";
import stakeNftAbi from "src/abis/PiraStakingNFT.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export const unstake = createAsyncThunk(
  "stake/unstake",
  async ({ unstakeAmount }) => {
    try {
      const stakingAddress = BaseConfig.stakeNft;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftStaking = new ethers.Contract(
        stakingAddress,
        stakeNftAbi,
        signer
      );
      const BigNumber = ethers.BigNumber;
      const amountToUnStake = BigNumber.from(unstakeAmount);
      const unstakeTxHash = await nftStaking.unstake(amountToUnStake);
      const tx = await unstakeTxHash.wait();
      return { unstakeTxHash };
    } catch (error) {
      console.log("error", error);

      throw Error("Failed to unstake nft");
    }
  }
);
