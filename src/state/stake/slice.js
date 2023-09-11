import { createSlice } from "@reduxjs/toolkit";
import { approveAllTokens } from "./thunks/approveAllTokens";
import { fetchTotalRewards } from "./thunks/fetchTotalRewards";
import { getNFTStakedBalance } from "./thunks/getNFTStakedBalance";
import { loadUserNftBalance } from "./thunks/loadUserNftBalance";
import { formatEther } from "ethers/lib/utils";
import { harvestRewards } from "./thunks/harvestRewards";
import { isApprovedTokens } from "./thunks/isApprovedTokens";
import { stakeNft } from "./thunks/stakeNft";
import { unstake } from "./thunks/unstake";

const stakeSlice = createSlice({
  name: "stake",
  initialState: {
    isApproving: false,
    approvalError: null,
    approvalSuccess: false,
    approvalTxHash: null,
    totalRewards: { value: "0", isLoading: false },
    totalNftStacked: { value: "0", isLoading: false },
    userBalance: { value: "0", isLoading: false },
    isApproved: false,
    isApprovingTokens: false,
    approvalTokensError: null,
    approvalTokensTxHash: null,
    approvingAllToken: false,
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
  },
  extraReducers: (builder) => {
    // get total reward
    builder.addCase(fetchTotalRewards.pending, (state) => {
      state.totalRewards.isLoading = true;
    });
    builder.addCase(fetchTotalRewards.fulfilled, (state, action) => {
      state.totalRewards.isLoading = false;
      state.totalRewards.value = formatEther(action.payload);
    });
    builder.addCase(fetchTotalRewards.rejected, (state, action) => {
      state.totalRewards.isLoading = false;
      state.totalRewards.value = "0";
    });
    // get balance nft staked
    builder.addCase(getNFTStakedBalance.pending, (state) => {
      state.totalNftStacked.isLoading = true;
    });
    builder.addCase(getNFTStakedBalance.fulfilled, (state, action) => {
      state.totalNftStacked.isLoading = false;
      state.totalNftStacked.value = action.payload?.toString();
    });
    builder.addCase(getNFTStakedBalance.rejected, (state, action) => {
      state.totalNftStacked.isLoading = false;
      state.totalNftStacked.value = "0";
    });
    // get user balance nft
    builder.addCase(loadUserNftBalance.pending, (state) => {
      state.userBalance.isLoading = true;
    });
    builder.addCase(loadUserNftBalance.fulfilled, (state, action) => {
      state.userBalance.isLoading = false;
      state.userBalance.value = action.payload?.toString();
    });
    builder.addCase(loadUserNftBalance.rejected, (state, action) => {
      state.userBalance.isLoading = false;
      state.userBalance.value = "0";
    });

    // approve for all token
    builder.addCase(approveAllTokens.pending, (state) => {
      state.approvingAllToken = true;
    });
    builder.addCase(approveAllTokens.fulfilled, (state) => {
      state.approvingAllToken = false;
    });
    builder.addCase(approveAllTokens.rejected, (state) => {
      state.approvingAllToken = true;
    });
    // stake nft
    builder.addCase(stakeNft.pending, (state) => {
      state.stakingNft = true;
    });
    builder.addCase(stakeNft.fulfilled, (state) => {
      state.stakingNft = false;
    });
    builder.addCase(stakeNft.rejected, (state) => {
      state.stakingNft = true;
    });
    // unstake nft
    builder.addCase(unstake.pending, (state) => {
      state.unstaking = true;
    });
    builder.addCase(unstake.fulfilled, (state) => {
      state.unstaking = false;
    });
    builder.addCase(unstake.rejected, (state) => {
      state.unstaking = true;
    });
    // harvest
    builder.addCase(harvestRewards.pending, (state) => {
      state.harvestingRewards = true;
    });
    builder.addCase(harvestRewards.fulfilled, (state) => {
      state.harvestingRewards = false;
    });
    builder.addCase(harvestRewards.rejected, (state) => {
      state.harvestingRewards = true;
    });
    // check if approved for all tokens
    builder.addCase(isApprovedTokens.pending, (state) => {
      state.isApprovingTokens = true;
    });
    builder.addCase(isApprovedTokens.fulfilled, (state, action) => {
      state.isApprovingTokens = false;
      state.isApproved = action.payload;
    });
    builder.addCase(isApprovedTokens.rejected, (state) => {
      state.isApprovingTokens = false;
      state.isApproved = false;
    });
  },
});

export const {
  approveAllTokensPending,
  approveAllTokensSuccess,
  approveAllTokensFailure,
} = stakeSlice.actions;

export default stakeSlice.reducer;

export {
  approveAllTokens,
  fetchTotalRewards,
  harvestRewards,
  getNFTStakedBalance,
  loadUserNftBalance,
  isApprovedTokens,
  stakeNft,
  unstake,
};
