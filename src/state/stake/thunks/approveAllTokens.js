import {
  approveAllTokensPending,
  approveAllTokensSuccess,
  approveAllTokensFailure,
} from "../slice";
import { ethers } from "ethers";
import stakeNftAbi from "src/abis/PiraStakingNFT.json";
import nftAbi from "src/abis/MintNft.json";
import BaseTestnetConfig from "src/state/config/base-testnet.json";
import BaseMainnetConfig from "src/state/config/base-mainnet.json";

const BaseConfig =
  process.env.NEXT_PUBLIC_NETWORK == "mainnet"
    ? BaseMainnetConfig
    : BaseTestnetConfig;

const approveAllTokens = (owner) => async (dispatch) => {
  try {
    dispatch(approveAllTokensPending());

    const nftAddress = BaseConfig.nft;
    const stakingAddress = BaseConfig.stakeNft;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
    const nftStaking = new ethers.Contract(stakingAddress, stakeNftAbi, signer);

    // Set approval for all tokens
    const tx = await nftContract.setApprovalForAll(nftStaking.address, true);

    console.log(
      `All NFT tokens owned by ${owner} have been approved for the staking contract.`
    );
    dispatch(approveAllTokensSuccess());
  } catch (err) {
    console.error(err);
    dispatch(approveAllTokensFailure(err));
  }
};
export { approveAllTokens };
