import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;

async function ClaimApi(data) {
  const url = `${BASE_URL}/pira/api/v1/airdrop/claim-task`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
}

const claimTask = createAsyncThunk(
  'airdrop/claim',
  async (data, refetchTask) => {
    const claimResult = await ClaimApi(data);
    return refetchTask();
  }
);
export default claimTask;
