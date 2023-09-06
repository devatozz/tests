import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import stakeNftAbi from "src/abis/PiraStakingNFT.json";
import nftAbi from "src/abis/MintNft.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export const isApprovedTokens = createAsyncThunk(
  "nft/isApprovedTokens",
  async ({ owner }) => {
    try {
      const nftAddress = BaseConfig.nft;
      const stakingAddress = BaseConfig.stakeNft;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
      const nftStaking = new ethers.Contract(
        stakingAddress,
        stakeNftAbi,
        signer
      );
      const approved = await nftContract.isApprovedForAll(
        owner,
        nftStaking.address
      );

      return approved;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
