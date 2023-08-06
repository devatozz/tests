import { createAsyncThunk } from '@reduxjs/toolkit';

async function GetTaskListApi(address) {
  const url = `http://localhost:3000/pira/api/v1/airdrop?address=${address}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
}

const loadTaskList = createAsyncThunk(
  'airdrop/task',
  async (address, { getState }) => {
    const taskListResult = await GetTaskListApi(address);
    console.log('taskListResult', taskListResult);

    // TODO : RETURN DATA HERE --> slice.js --> update state
    return { taskListResult }; //and DELETE THIS LINE
  }
);
export default loadTaskList;
