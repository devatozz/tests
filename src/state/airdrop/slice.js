import { createSlice } from "@reduxjs/toolkit";

import loadTaskList from "./thunks/getTaskList";
import loadLeaderboard from "./thunks/getLeaderboard";
import claimTask from "./thunks/claimTask";
import mintNFT from "./thunks/mintNFT";

const initialState = {
  mintError: false,
  overview: {
    earningTokens: 0,
    referralTokens: 0,
    boost: 0,
  },
  totalTokenClaimed: 0,
  taskList: [],
  leaderBoard: [],
  countDownMintNFT: 0,
  inviteFriendTaskTokenEarn: 0,
  isLoading: true,
};

export const slice = createSlice({
  name: "airdrop",
  initialState,
  reducers: {
    select: (state, action) => {
      state.airdrop = action.airdrop;
    },
    clearMintError: (state) => {
      state.mintError = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTaskList.pending, (state) => {
      // state.isLoading = true;
    });
    builder.addCase(loadTaskList.fulfilled, (state, action) => {
      state.overview = action.payload?.taskListResult?.data?.overview;
      state.totalTokenClaimed =
        action.payload?.taskListResult?.data?.totalTokenClaimed;
      state.taskList = [
        action.payload?.taskListResult?.data?.nftTask,
        action.payload?.taskListResult?.data?.swapTask,
        action.payload?.taskListResult?.data?.addLiquidityTask,
      ];
      state.inviteFriendTaskTokenEarn =
        action.payload?.taskListResult?.data?.inviteFriendTask.tokenEarn;
      state.countDownMintNFT =
        action.payload?.taskListResult?.data?.nftTask?.countDownInMS;
      state.isLoading = false;
    });

    builder.addCase(loadLeaderboard.pending, (state) => {
      // state.isLoading = true;
    });
    builder.addCase(loadLeaderboard.fulfilled, (state, action) => {
      console.log("test", action.payload?.leaderboardResult);
      state.leaderBoard = action.payload?.leaderboardResult || [];
    });

    builder.addCase(claimTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(claimTask.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(claimTask.rejected, (state, action) => {
      state.isLoading = false;
      console.error("Error message:", action.error.message);
    });

    builder.addCase(mintNFT.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(mintNFT.fulfilled, (state, action) => {
      state.mintError = !action.payload.isSuccess;
      state.isLoading = false;
    });

    builder.addCase(mintNFT.rejected, (state, action) => {
      state.isLoading = false;
      console.error("Error message:", action.error.message);
    });
  },
});

export const { clearMintError } = slice.actions;
export default slice.reducer;
