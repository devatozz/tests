import { createAsyncThunk } from '@reduxjs/toolkit';
import ABI_MINT_NFT from 'src/abis/MintNft.json';
import { ethers } from 'ethers';
import BaseConfig from 'src/state/config/base.json';

const MINT_FEE = '0.0015';

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
  } catch (error) {
    console.error(error);
  }
};
const mintNFT = createAsyncThunk('airdrop/minNFT', async (refetchTask) => {
  //HANDLE MINT NFT HERE
  await handleMintNft();
  setTimeout(() => refetchTask(), 4000);

  return null;
});
export default mintNFT;
