import { createAsyncThunk } from '@reduxjs/toolkit';



const mintNFT = createAsyncThunk(
  'airdrop/minNFT',
  async (address, refetchTask) => {
    
    //HANDLE MINT NFT HERE

    return  refetchTask()
  }
);
export default mintNFT;
