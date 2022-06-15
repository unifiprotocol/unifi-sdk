import { useCallback, useEffect, useMemo, useState } from "react";
import { mediaQueries, SecondaryButton } from "@unifiprotocol/uikit";
import { useAdapter } from "../../Adapter/useAdapter";
import { BlockchainModal } from "../BlockchainModal";
import { IConfig } from "../../Config";
import styled from "styled-components";
import { ShellEventBus } from "../../EventBus";
import { OpenNetworkModalEvent } from "../../EventBus/Events/UIEvents";
import { getVernacularBlockchain } from "@unifiprotocol/utils";
import {
  ChangeNetwork,
  ChangeNetworkEvent,
} from "../../EventBus/Events/BlockchainEvents";
import { useBalances } from "../../Balances/useBalances";
import { getBlockchainConfig } from "@unifiprotocol/core-sdk";

const ActionButtonWrapped = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChainLogo = styled.img`
  margin-right: 0.5rem;
  width: 20px;
  height: auto;
  border-radius: 50%;

  ${mediaQueries.xs} {
    margin-right: 0;
  }
`;

const ChainName = styled.span`
  ${mediaQueries.xs} {
    display: none;
  }
`;

export const BlockchainAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeChain, updateChain } = useAdapter();
  const { wipe } = useBalances();

  const cfgActiveChain = useMemo(() => {
    return getBlockchainConfig(activeChain.blockchain);
  }, [activeChain]);

  const onNetworkChange = useCallback(
    (cfg: IConfig) => {
      wipe(); // wipe here to be sync
      updateChain(cfg);
      setIsModalOpen(false);
    },
    [updateChain, wipe]
  );

  useEffect(() => {
    const fn = () => !isModalOpen && setIsModalOpen(true);
    ShellEventBus.on(OpenNetworkModalEvent, fn);
    return () => {
      ShellEventBus.off(OpenNetworkModalEvent, fn);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const onChangeNetwork = (event: ChangeNetwork) =>
      onNetworkChange(event.payload);
    ShellEventBus.on(ChangeNetworkEvent, onChangeNetwork);
    return () => {
      ShellEventBus.off(ChangeNetworkEvent, onChangeNetwork);
    };
  }, [onNetworkChange]);

  return (
    <>
      <SecondaryButton onClick={() => setIsModalOpen(true)}>
        <ActionButtonWrapped>
          <ChainLogo
            src={cfgActiveChain.logoURI}
            alt={activeChain.blockchain}
          />
          <ChainName>
            {getVernacularBlockchain(activeChain.blockchain)}
          </ChainName>
        </ActionButtonWrapped>
      </SecondaryButton>
      <BlockchainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNetworkChange={onNetworkChange}
      />
    </>
  );
};
