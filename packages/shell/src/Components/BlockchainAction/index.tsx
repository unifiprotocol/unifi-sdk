import React, { useCallback, useState } from "react";
import { SecondaryButton } from "@unifiprotocol/uikit";
import { useAdapter } from "../../Adapter";
import { BlockchainModal } from "../BlockchainModal";
import { IConfig } from "../../Config";

export const BlockchainAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeChain, updateChain } = useAdapter();

  const onNetworkChange = useCallback(
    (cfg: IConfig) => {
      updateChain(cfg);
      setIsModalOpen(false);
    },
    [updateChain]
  );

  return (
    <>
      <SecondaryButton onClick={() => setIsModalOpen(true)}>
        {activeChain.blockchain}
      </SecondaryButton>
      <BlockchainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNetworkChange={onNetworkChange}
      />
    </>
  );
};
