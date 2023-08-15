import { createAsyncThunk } from "@reduxjs/toolkit";
import ABI_MINT_NFT from "src/abis/MintNft.json";
import { ethers } from "ethers";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const MINT_FEE = "0.0015";
const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

const handleMintNft = async () => {
  const mintNftContractWithSigner = (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, ABI_MINT_NFT, signer);
  };

  const contract = mintNftContractWithSigner(BaseConfig.nft);

  try {
    const tx = await contract.mint({
      value: ethers.utils.parseEther(MINT_FEE),
    });
    const txResult = await tx.wait();
    return true;
  } catch (error) {
    return false;
  }
};
const mintNFT = createAsyncThunk("airdrop/minNFT", async (refetchTask) => {
  //HANDLE MINT NFT HERE
  const isSuccess = await handleMintNft();
  setTimeout(() => refetchTask(), 4000);

  return { isSuccess };
});
export default mintNFT;
