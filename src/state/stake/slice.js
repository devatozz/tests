import { createSlice } from "@reduxjs/toolkit";
import { approveAllTokens } from "./thunks/approveAllTokens";
import { fetchTotalRewards } from "./thunks/fetchTotalRewards";
import { getNFTBalance } from "./thunks/getNFTBalance";
import { formatEther } from "ethers/lib/utils";
import { harvestRewards } from "./thunks/harvestRewards";

const STAKE_SUCCESS = "stake/stakeSuccess";
const UNSTAKE_SUCCESS = "stake/unstakeSuccess";

const stakeSlice = createSlice({
  name: "stake",
  initialState: {
    isApproving: false,
    approvalError: null,
    approvalSuccess: false,
    approvalTxHash: null,
    isStaking: false,
    stakeError: null,
    stakeSuccess: false,
    //
    isUnStaking: false,
    unstakeError: null,
    unstakeSuccess: false,
    totalRewards: "0",
    totalNftStacked: "0",
  },
  reducers: {
    approveAllTokensPending: (state) => {
      state.isApproving = true;
      state.approvalError = null;
      state.approvalSuccess = false;
      state.approvalTxHash = null;
    },
    approveAllTokensSuccess: (state, action) => {
      state.isApproving = false;
      state.approvalSuccess = true;
      state.approvalTxHash = action.payload;
    },
    approveAllTokensFailure: (state, action) => {
      state.isApproving = false;
      state.approvalError = action.payload;
    },
    //
    stakePending: (state) => {
      state.isStaking = true;
      state.stakeError = null;
      state.stakeSuccess = false;
    },
    stakeSuccess: (state) => {
      state.isStaking = false;
      state.stakeSuccess = true;
    },
    stakeFailure: (state, action) => {
      state.isStaking = false;
      state.stakeError = action.payload;
    },
    //
    unstakePending: (state) => {
      state.isUnStaking = true;
      state.unstakeError = null;
      state.unstakeSuccess = false;
    },
    unstakeSuccess: (state) => {
      state.isUnStaking = false;
      state.unstakeSuccess = true;
    },
    unstakeFailure: (state, action) => {
      state.isUnStaking = false;
      state.unstakeError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTotalRewards.fulfilled, (state, action) => {
      state.totalRewards = formatEther(action.payload);
    });
    builder.addCase(fetchTotalRewards.rejected, (state, action) => {
      state.totalRewards = "0";
    });
    builder.addCase(getNFTBalance.fulfilled, (state, action) => {
      state.totalNftStacked = action.payload.toString();
    });
    builder.addCase(getNFTBalance.rejected, (state, action) => {
      state.totalNftStacked = "0";
    });
    builder.addCase(harvestRewards.pending, (state) => {
      state.harvestingRewards = true;
    });
    builder.addCase(harvestRewards.fulfilled, (state) => {
      state.harvestingRewards = false;
    });
    builder.addCase(harvestRewards.rejected, (state) => {
      state.harvestingRewards = true;
    });
  },
});

export const {
  approveAllTokensPending,
  approveAllTokensSuccess,
  approveAllTokensFailure,
  stakePending,
  stakeSuccess,
  stakeFailure,
  unstakePending,
  unstakeSuccess,
  unstakeFailure,
} = stakeSlice.actions;

export default stakeSlice.reducer;

export {
  approveAllTokens,
  fetchTotalRewards,
  harvestRewards,
  STAKE_SUCCESS,
  getNFTBalance,
  UNSTAKE_SUCCESS,
};
