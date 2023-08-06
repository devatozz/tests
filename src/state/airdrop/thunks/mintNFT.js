import { createAsyncThunk } from '@reduxjs/toolkit';
import ABI_MINT_NFT from 'src/abis/MintNft.json';
import { ethers } from 'ethers';
import BaseConfig from 'src/state/config/base.json';

const handleMintNft = async () => {
  console.log('debug 2');

  const mintNftContractWithSigner = (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, ABI_MINT_NFT, signer);
  };

  const contract = mintNftContractWithSigner(BaseConfig.nft);

  try {
    const tx = await contract.mint({ value: ethers.utils.parseEther('0.001') });
    const txResult = await tx.wait();
    console.log('txResult', txResult);
    console.log('transaction hash', txResult.transactionHash);
  } catch (error) {
    console.error(error);
  }
};
const mintNFT = createAsyncThunk('airdrop/minNFT', async (refetchTask) => {
  //HANDLE MINT NFT HERE
  await handleMintNft();
  return refetchTask();
});
export default mintNFT;
