import BN from "bn.js";
import { BigNumber } from "ethers";
import { config, noneAddress } from "src/state/chain/config";
import { ethers } from "ethers";

import PancakeERC20 from "src/abis/PancakeERC20.json";
import PancakePair from "src/abis/PancakePair.json";

export const getSteps = (tokenIn, tokenOut, poolMatrix) => {
  let par = {};
  let visit = [tokenIn];
  let q = [tokenIn];
  while (q.length) {
    let u = q[0];
    q.shift();
    let ku = Object.keys(poolMatrix[u]);
    for (let v = 0; v < ku.length; v++) {
      if (!visit.includes(ku[v])) {
        par[ku[v]] = u;
        visit.push(ku[v]);
        q.push(ku[v]);
      }
    }
  }
  if (!visit.includes(tokenOut)) return [];
  let steps = [];
  while (tokenOut != tokenIn) {
    steps.push(tokenOut);
    tokenOut = par[tokenOut];
  }
  steps.push(tokenIn);
  steps.reverse();
  return steps;
};

function getTokenContract(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(address, PancakeERC20.abi, provider);
}

export const loadBalance = async (account, chain, tokenAddress) => {
  try {
    let result = BigNumber.from(0)
    if (tokenAddress.toLocaleLowerCase() == config[chain]?.wrapAddress.toLocaleLowerCase() || tokenAddress ==noneAddress) {
      let ethBalance = await window.ethereum.request({
        "method": "eth_getBalance",
        "params": [
          account
        ]
      })
      return BigNumber.from(ethBalance)
    }
    const tokenContract = getTokenContract(tokenAddress);
    result = await tokenContract.balanceOf(account)
    return result;
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
};

export const createFtContractWithSigner = (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(address, PancakeERC20.abi, signer);
}

export const createPairContractWithSigner = (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(address, PancakePair.abi, signer);
}