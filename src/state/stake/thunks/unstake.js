import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  UNSTAKE_SUCCESS,
  unstakeFailure,
  unstakePending,
  unstakeSuccess,
} from "../slice";
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
  async ({ unstakeAmount }, { dispatch }) => {
    try {
      dispatch(unstakePending());
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
      const unstakeTxHash = await nftStaking.unstake(amountToUnStake, {
        gasLimit: 1000000,
      });
      const tx = unstakeTxHash.wait();
      dispatch(unstakeSuccess());
      return { unstakeTxHash };
    } catch (error) {
      console.log("error", error);

      dispatch(unstakeFailure(error.message));
      throw error;
    }
  }
);

export const handleunStakeSuccess = () => {
  return { type: UNSTAKE_SUCCESS };
};
