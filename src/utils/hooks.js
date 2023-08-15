import { useWalletClient } from 'wagmi'
import { useMemo } from 'react'
import { config, forwardConfig } from 'src/state/chain/config'
import { getContract as viemGetContract } from 'viem'
import PiraRouter from "src/abis/PiraRouter.json";
import PiraERC20 from "src/abis/PiraERC20.json";
import PiraPair from "src/abis/PiraPair.json";
import PiraWETH from "src/abis/PiraWETH.json";

export const getContract = ({
    abi,
    address,
    chainId = config.base.chainId,
    publicClient,
    signer,
}) => {
    const c = viemGetContract({
        abi,
        address,
        publicClient: publicClient ?? viemClients[chainId],
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
) {
    const { data: walletClient } = useWalletClient()

    return useMemo(() => {
        if (!address) return null
        try {
            return getContract({
                abi,
                address,
                chainId: config.base.chainId,
                signer: walletClient,
            })
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, abi, walletClient])
}

export function useRouterMainContract() {
    return useContract(config.base.dexAddress, PiraRouter.abi)
}

export function useRouterForwardContract() {
    return useContract(forwardConfig.base.dexAddress, PiraRouter.abi)
}

export function useERC20Contract(address) {
    return useContract(address, PiraERC20.abi)
}

export function usePairContract(address) {
    return useContract(address, PiraPair.abi)
}

export function useWETHContract() {
    return useContract(config.base.wrapAddress, PiraWETH.abi)
}