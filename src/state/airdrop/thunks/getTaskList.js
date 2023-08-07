import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;

async function GetTaskListApi(address) {
  const url = `${BASE_URL}/pira/api/v1/airdrop?address=${address}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

const loadTaskList = createAsyncThunk("airdrop/task", async (address) => {
  const taskListResult = await GetTaskListApi(address);
  return { taskListResult }; //and DELETE THIS LINE
});
export default loadTaskList;
