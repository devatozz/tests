import { createSlice } from "@reduxjs/toolkit";

import loadTaskList from "./thunks/getTaskList";
const initialState = {
  taskList: [],
  totalProgress: 0,
  isLoading: true,
};
export const slice = createSlice({
  name: "airdrop",
  initialState,
  reducers: {
    select: (state, action) => {
      state.airdrop = action.airdrop;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTaskList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadTaskList.fulfilled, (state, action) => {
      console.log(action.payload);
      state.totalProgress = action.payload.progress;
      state.taskList = action.payload.taskList;
      state.isLoading = false;
    });
  },
});

export const {} = slice.actions;
export default slice.reducer;
