import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import nftAbi from "src/abis/MintNft.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

export const loadUserNftBalance = createAsyncThunk(
  "stake/loadUserNftBalance",
  async (account) => {
    try {
      let result = BigNumber.from(0);
      const nftAddress = BaseConfig.nft;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
      result = await nftContract.balanceOf(account);
      return result;
    } catch (error) {
      console.error("Error fetching NFT balance:", error);
    }
  }
);
