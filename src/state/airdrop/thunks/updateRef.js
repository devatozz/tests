import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;

async function updateRefApi(data) {
  const url = `${BASE_URL}/pira/api/v1/airdrop/referral`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

const updateRef = createAsyncThunk("airdrop/task", async (data) => {
  await updateRefApi(data);
  return null;
});
export default updateRef;
