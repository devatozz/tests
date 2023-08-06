import { createAsyncThunk } from '@reduxjs/toolkit';

async function GetTaskListApi(address) {
  const url = `http://localhost:3000/pira/api/v1/airdrop?address=${address}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
}

const mintNFT = createAsyncThunk(
  'airdrop/minNFT',
  async (address, refetchTask) => {
    
    //HANDLE MINT NFT HERE

    return  refetchTask()
  }
);
export default loadTaskList;
