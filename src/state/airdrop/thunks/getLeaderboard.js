import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;

async function GetLeaderboardApi(address) {
  const url = `${BASE_URL}/pira/api/v1/airdrop/leaderboard?address=${address}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
}

const loadLeaderboard = createAsyncThunk(
  'airdrop/leaderboard',
  async (address) => {
    const leaderboard = await GetLeaderboardApi(address);
    return { leaderboardResult: leaderboard }; //and DELETE THIS LINE
  }
);
export default loadLeaderboard;
