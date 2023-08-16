import { config, forwardConfig } from 'src/state/chain/config'
import { getContract as viemGetContract } from 'viem'
import PiraRouter from "src/abis/PiraRouter.json";
import PiraERC20 from "src/abis/PiraERC20.json";
import PiraPair from "src/abis/PiraPair.json";
import PiraWETH from "src/abis/PiraWETH.json";
import ABI_MINT_NFT from 'src/abis/MintNft.json';

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

export function useContract(
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

export function useRouterMainContract(walletClient, publicClient) {
    return useContract(config.base.dexAddress, PiraRouter.abi, walletClient, publicClient)
}

export function useRouterForwardContract(walletClient, publicClient) {
    return useContract(forwardConfig.base.dexAddress, PiraRouter.abi, walletClient, publicClient)
}

export function useERC20Contract(address, walletClient, publicClient) {
    return useContract(address, PiraERC20.abi, walletClient, publicClient)
}

export function usePairContract(address, walletClient, publicClient) {
    return useContract(address, PiraPair.abi, walletClient, publicClient)
}

export function useWETHContract(walletClient, publicClient) {
    return useContract(config.base.wrapAddress, PiraWETH.abi, walletClient, publicClient)
}

export function useNftContract(walletClient, publicClient) {
    return useContract(config.base.nftAddress, ABI_MINT_NFT, walletClient, publicClient)
}