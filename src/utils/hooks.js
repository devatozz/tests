import { config, forwardConfig } from 'src/state/chain/config'
import { getContract as viemGetContract } from 'viem'
import PiraRouter from "src/abis/PiraRouter.json";
import PiraERC20 from "src/abis/PiraERC20.json";
import PiraPair from "src/abis/PiraPair.json";
import PiraWETH from "src/abis/PiraWETH.json";
import ABI_MINT_NFT from 'src/abis/MintNft.json';
import ABI_MULTI_MINT_NFT from 'src/abis/MultiMintNft.json';

export const getContract = ({
    abi,
    address,
    signer,
    publicClient
}) => {
    
    const c = viemGetContract({
        abi,
        address,
        publicClient,
        walletClient: signer,
    })
    return {
        ...c,
        account: signer?.account,
        chain: signer?.chain,
    }
}

export function prepareContract(
    address,
    abi,
    walletClient,
    publicClient
) {
    if (!address) return null
    try {
        return getContract({
            abi,
            address,
            chainId: config.base.chainId,
            signer: walletClient,
            publicClient
        })
    } catch (error) {
        console.error('Failed to get contract', error)
        return null
    }
}

export function getRouterMainContract(walletClient, publicClient) {
    return prepareContract(config.base.dexAddress, PiraRouter.abi, walletClient, publicClient)
}

export function getRouterForwardContract(walletClient, publicClient) {
    return prepareContract(forwardConfig.base.dexAddress, PiraRouter.abi, walletClient, publicClient)
}

export function getERC20Contract(address, walletClient, publicClient) {
    return prepareContract(address, PiraERC20.abi, walletClient, publicClient)
}

export function getPairContract(address, walletClient, publicClient) {
    return prepareContract(address, PiraPair.abi, walletClient, publicClient)
}

export function getWETHContract(walletClient, publicClient) {
    return prepareContract(config.base.wrapAddress, PiraWETH.abi, walletClient, publicClient)
}

export function getNftContract(walletClient, publicClient) {
    return prepareContract(config.base.nftAddress, ABI_MINT_NFT, walletClient, publicClient)
}

export function getMultiNftContract(walletClient, publicClient) {
    return prepareContract(config.base.multiNftAddress, ABI_MULTI_MINT_NFT, walletClient, publicClient)
}