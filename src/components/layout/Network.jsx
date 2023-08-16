import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "src/state/chain/config";
import {
  connectNetwork,
  disconnectNetwork,
} from "src/state/chain/slice";
import loadContracts from "src/state/dex/thunks/loadContract";
import loadPools from "src/state/dex/thunks/loadPools";
import loadTokens from "src/state/dex/thunks/loadTokens";
import loadForwardContracts  from "src/state/forward/thunks/loadContract";
import loadForwardPools from "src/state/forward/thunks/loadPools";
import loadForwardTokens from "src/state/forward/thunks/loadTokens";
import { Web3Button } from '@web3modal/react'
import { useAccount, useNetwork, useConnect, useSwitchNetwork } from 'wagmi'
import { useWeb3Modal } from "@web3modal/react";
export default function Network() {
  const dispatch = useDispatch();
  const { lastConnected } = useSelector(
    (state) => state.chain
  );
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { open, isOpen } = useWeb3Modal()

  const {
    loaded: contractLoaded,
    tokens: { loaded: tokenLoaded },
    pools: { loaded: poolLoaded },
  } = useSelector((state) => state.dex);
  const {
    loaded: forwardContractLoaded,
    tokens: { loaded: fowardTokenLoaded },
    pools: { loaded: forwardPoolLoaded },
  } = useSelector((state) => state.forward);

  const handleDisconnectNetwork = useCallback(async () => {
    dispatch(disconnectNetwork());
  }, []);

  const handleConnectNetwork = useCallback(async () => {
    dispatch(connectNetwork());
  }, []);

  const { isConnected } = useAccount({
    onConnect: handleConnectNetwork,
    onDisconnect: handleDisconnectNetwork
  })

  const handleCheckChain = useCallback(async () => {
    if (chain.id !== config.base.chainId) {
      switchNetwork?.(config.base.chainId)
    }
  }, [config, switchNetwork, chain]);

  useEffect(() => {
    if (isConnected && switchNetwork) {
      handleCheckChain();
    }
  }, [isConnected, switchNetwork]);

  useEffect(() => {
    if (lastConnected && !isOpen) {
      open()
    }
  }, [lastConnected]);

  useEffect(() => {
    if (!contractLoaded) {
      dispatch(loadContracts());
    } else {
      dispatch(loadPools());
    }
  }, [contractLoaded]);

  useEffect(() => {
    if (!forwardContractLoaded) {
      dispatch(loadForwardContracts());
    } else {
      dispatch(loadForwardPools());
    }
  }, [forwardContractLoaded]);

  useEffect(() => {
    if (contractLoaded && poolLoaded && !tokenLoaded) {
      dispatch(loadTokens());
    }
  }, [contractLoaded, poolLoaded, tokenLoaded]);

  useEffect(() => {
    if (forwardContractLoaded && forwardPoolLoaded && !fowardTokenLoaded) {
      dispatch(loadForwardTokens());
    }
  }, [forwardContractLoaded, forwardPoolLoaded, fowardTokenLoaded]);

  return (
    <Web3Button balance='show' themeMode='light' icon='hide' />
  );
}
