import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { config } from "src/state/chain/config";
import PiraRouter from "src/abis/PiraRouter.json";
import PiraFactory from "src/abis/PiraFactory.json";

async function GetProgress() {
  const url = `/api_endpoint}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

async function GetTaskListApi(address) {
  const url = `/api_endpoint?${address}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

const loadTaskList = createAsyncThunk(
  "airdrop/task",
  async (address, { getState }) => {
    // const progressResult = await GetProgress();
    // const taskListResult = await GetTaskListApi(address);
    // TODO : RETURN DATA HERE --> slice.js --> update state
    return { progress: 60, taskList: [1, 2, 3] }; //and DELETE THIS LINE
  }
);
export default loadTaskList;
