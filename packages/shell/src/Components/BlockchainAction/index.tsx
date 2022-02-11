import React, { useCallback, useState } from "react";
import { SecondaryButton } from "@unifiprotocol/uikit";
import { useAdapter } from "../../Adapter";
import { BlockchainModal } from "../BlockchainModal";
import { IConfig } from "../../Config";
import styled from "styled-components";
import { NetworkChanged } from "../../EventBus/Events/AdapterEvents";
import { ShellEventBus } from "../../EventBus";
import { Wipe } from "../../EventBus/Events/BalancesEvents";

const ActionButtonWrapped = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChainLogo = styled.img`
  margin-right: 0.5rem;
  width: 20px;
  height: auto;
`;

export const BlockchainAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeChain, updateChain } = useAdapter();

  const onNetworkChange = useCallback(
    (cfg: IConfig) => {
      updateChain(cfg);
      ShellEventBus.emit(new NetworkChanged(cfg.chainId));
      ShellEventBus.emit(new Wipe());
      setIsModalOpen(false);
    },
    [updateChain]
  );

  return (
    <>
      <SecondaryButton onClick={() => setIsModalOpen(true)}>
        <ActionButtonWrapped>
          <ChainLogo src={activeChain.logoURI} alt={activeChain.blockchain} />
          <span>{activeChain.blockchain}</span>
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
