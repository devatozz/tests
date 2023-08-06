import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;

async function GetTaskListApi(address) {
  const url = `${BASE_URL}/pira/api/v1/airdrop?address=${address}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
}

const loadTaskList = createAsyncThunk(
  'airdrop/task',
  async (address, { getState }) => {
    const address = useSelector((state) => state.chain.account);
    const taskListResult = await GetTaskListApi(address);
    // TODO : RETURN DATA HERE --> slice.js --> update state
    return { taskListResult }; //and DELETE THIS LINE
  }
);
export default loadTaskList;
