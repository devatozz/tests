import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  STAKE_SUCCESS,
  stakeFailure,
  stakePending,
  stakeSuccess,
  approveAllTokens,
} from "../slice";
import { ethers } from "ethers";
import stakeNftAbi from "src/abis/PiraStakingNFT.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export const stake = createAsyncThunk(
  "stake/stakeNft",
  async ({ amount }, { dispatch }) => {
    try {
      dispatch(stakePending());
      const approvedTxHash = await approveAllTokens();
      const stakingAddress = BaseConfig.stakeNft;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftStaking = new ethers.Contract(
        stakingAddress,
        stakeNftAbi,
        signer
      );
      const BigNumber = ethers.BigNumber;
      const amountToStake = BigNumber.from(amount);
      const stakeTxHash = await nftStaking.stakeByAmount(amountToStake, {
        gasLimit: 1000000,
      });
      const tx = stakeTxHash.wait();
      dispatch(stakeSuccess());
      return { approvedTxHash, stakeTxHash };
    } catch (error) {
      console.log("error", error);

      dispatch(stakeFailure(error.message));
      throw error;
    }
  }
);

export const handleStakeSuccess = () => {
  return { type: STAKE_SUCCESS };
};
