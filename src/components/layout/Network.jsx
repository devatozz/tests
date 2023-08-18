import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config, walletInfos } from "src/state/chain/config";
import {
  connectNetwork,
  disconnectNetwork,
} from "src/state/chain/slice";
import loadContracts from "src/state/dex/thunks/loadContract";
import loadPools from "src/state/dex/thunks/loadPools";
import loadTokens from "src/state/dex/thunks/loadTokens";
import loadForwardContracts from "src/state/forward/thunks/loadContract";
import loadForwardPools from "src/state/forward/thunks/loadPools";
import loadForwardTokens from "src/state/forward/thunks/loadTokens";
import {
  Button,
  Image,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  useClipboard,
  useToast
} from "@chakra-ui/react";
import WalletIcon from "../icons/Wallet";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
  useNetwork
} from 'wagmi'
import { CopyIcon, SmallCloseIcon } from "@chakra-ui/icons";

export default function Network() {
  const dispatch = useDispatch();
  const { lastConnected } = useSelector(
    (state) => state.chain
  );
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect, isLoading: isDisconnecting } = useDisconnect()
  
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

  const handleConnectNetwork = useCallback(async ({connector}) => {
    dispatch(connectNetwork(connector.id));
  }, []);

  const { isConnected, connector: currentConnector, address, isConnecting, isReconnecting } = useAccount({
    onConnect: handleConnectNetwork,
    onDisconnect: handleDisconnectNetwork
  })
  const { onCopy, setValue: setCopyValue } = useClipboard("");
  const toast = useToast();

  const copyAddress = () => {
    onCopy();
    toast({
      title: "Address is copied",
      status: "success",
      duration: 1000,
    });
  };

  const handleCheckChain = useCallback(async () => {
    if (chain.id !== config.base.chainId) {
      switchNetwork?.(config.base.chainId)
    }
  }, [config, switchNetwork, chain]);

  useEffect(() => {
    setCopyValue(address)
  }, [address])

  useEffect(() => {
    if (isConnected && switchNetwork) {
      handleCheckChain();
    }
  }, [isConnected, switchNetwork]);

  useEffect(() => {
    if (lastConnected && !isConnected && !isDisconnecting) {
      let lastConnector = connectors.find(item => item.id === lastConnected)
      if (lastConnector) {
        connect({connector: lastConnector})
      }
      connect()
    }
  }, [lastConnected, isConnected, isDisconnecting])

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

  if (isConnected) return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        leftIcon={
          <Image src={walletInfos[currentConnector?.id]?.logo} w={"20px"} h={"20px"} />
        }
        variant="solid"
        fontSize={"sm"}
        fontWeight={700}
        colorScheme="whiteAlpha"
      >
        {address
          ? address
            .slice(0, 6)
            .concat("...")
            .concat(address.slice(address.length - 6, address.length))
          : ""}
      </MenuButton>
      <MenuList zIndex={100}>
        <MenuItem
          as={Button}
          variant="ghost"
          leftIcon={<CopyIcon />}
          sx={{ fontWeight: 500, justifyContent: "start", px: 4 }}
          onClick={copyAddress}
        >
          Copy address
        </MenuItem>
        <MenuItem
          as={Button}
          variant="ghost"
          leftIcon={<SmallCloseIcon />}
          sx={{ fontWeight: 500, justifyContent: "start", px: 4 }}
          onClick={disconnect}
        >
          Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  )

  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        leftIcon={
          <WalletIcon />
        }
        variant="solid"
        fontWeight={700}
        colorScheme="whiteAlpha"
        isLoading={isConnecting || isReconnecting}
      >
        Connect wallet
      </MenuButton>
      <MenuList zIndex={100}>
        {connectors.map((connector) => (
          <MenuItem
            as={Button}
            isDisabled={!connector.ready}
            variant="ghost"
            key={connector.id}
            onClick={() => connect({ connector })}
            sx={{ fontWeight: 500, justifyContent: "start", px: 4 }}
            leftIcon={
              <Image src={walletInfos[connector.id].logo} w={"20px"} h={"20px"} />
            }
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
