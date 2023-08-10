import {
  Button,
  Text,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
  MenuButton,
  Image,
  Stack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import connectToWallet from "src/state/chain/thunks/connectWallet";
import { config, chainInfos } from "src/state/chain/config";
import { useRouter } from "next/router";
import WalletIcon from "src/components/icons/Wallet";
import {
  disconnectNetwork,
  handleEthereumAccountChange,
} from "src/state/chain/slice";
import loadContracts from "src/state/dex/thunks/loadContract";
import loadPools from "src/state/dex/thunks/loadPools";
import loadTokens from "src/state/dex/thunks/loadTokens";
import loadForwardContracts  from "src/state/forward/thunks/loadContract";
import loadForwardPools from "src/state/forward/thunks/loadPools";
import loadForwardTokens from "src/state/forward/thunks/loadTokens";

export default function Network() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isConnecting, selectedChain, account, web3Loaded } = useSelector(
    (state) => state.chain
  );
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

  const handleConnectNetwork = useCallback(
    async (chain) => {
      dispatch(connectToWallet(chain))
        .then(() => dispatch(loadForwardContracts()))
        .then(() => dispatch(loadForwardPools()))
    },
    []
  );

  const handleDisconnectNetwork = useCallback(async () => {
    // handle disconnect here
    dispatch(disconnectNetwork());
  }, [selectedChain]);

  const handleCheckChain = useCallback(async () => {
    //@ts-ignore
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== config[selectedChain].chainId) {
      dispatch(connectToWallet(selectedChain))
        .then(() => dispatch(loadForwardContracts()))
        .then(() => dispatch(loadForwardPools()))
    }
  }, [selectedChain]);

  useEffect(() => {
    if (selectedChain && window.ethereum) {
      handleCheckChain();
    }
  }, []);

  useEffect(() => {
    if (!contractLoaded && web3Loaded) {
      dispatch(loadContracts());
    } else if (contractLoaded && web3Loaded) {
      dispatch(loadPools());
    }
  }, [contractLoaded, web3Loaded]);

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

  useEffect(() => {
    if (selectedChain && account) {
      dispatch(loadContracts());
    }
  }, [selectedChain, account]);

  useEffect(() => {
    // Check metamask account is disconnected
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(handleEthereumAccountChange(accounts[0]));
      });
      //@ts-ignore
      window.ethereum.on("chainChanged", (chainId) => {
        let realChainId = parseInt(chainId, 16);
        console.log(realChainId);
        // todo handle chain changed
      });
    }
  }, []);

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={
          selectedChain ? (
            <Image
              bgColor={"white"}
              borderRadius={"20px"}
              p={1}
              src={chainInfos[selectedChain].logo}
              w={"25px"}
              h={"25px"}
            />
          ) : (
            <WalletIcon />
          )
        }
        variant="solid"
        fontSize={"sm"}
        fontWeight={700}
        colorScheme="whiteAlpha"
        isLoading={isConnecting}
      >
        {selectedChain ? (
          <Text>
            {account
              ? account
                  .slice(0, 7)
                  .concat("...")
                  .concat(account.slice(account.length - 7, account.length))
              : ""}
          </Text>
        ) : (
          <Text>
            <span>Connect wallet</span>
          </Text>
        )}
      </MenuButton>
      <MenuList zIndex={100}>
        <MenuDivider />
        {Object.keys(chainInfos).map((key) => (
          <MenuItem
            as={Button}
            isDisabled={chainInfos[key].disabled}
            leftIcon={
              <Image src={chainInfos[key].logo} w={"20px"} h={"20px"} />
            }
            variant="ghost"
            key={`network-${key}`}
            onClick={() => handleConnectNetwork(key)}
            sx={{ fontWeight: 500, justifyContent: "start", px: 4 }}
          >
            {chainInfos[key].label}
          </MenuItem>
        ))}
        <MenuDivider />
        {account && (
          <MenuItem
            as={Button}
            variant="ghost"
            onClick={() => handleDisconnectNetwork()}
          >
            Disconnect
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
