import { createAsyncThunk } from "@reduxjs/toolkit";
import { approveAllTokens } from "../slice";
import { ethers } from "ethers";
import stakeNftAbi from "src/abis/PiraStakingNFT.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export const stakeNft = createAsyncThunk(
  "stake/stakeNft",
  async ({ amount }) => {
    try {
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
      const stakeTxHash = await nftStaking.stakeByAmount(amountToStake);
      const tx = await stakeTxHash.wait();
    } catch (error) {
      console.log("error", error);

      throw Error("Failed to stake nft");
    }
  }
);
