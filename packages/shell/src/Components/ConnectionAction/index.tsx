import React, { useState } from "react";
import { PrimaryButton } from "@unifiprotocol/uikit";
import { ConnectionModal } from "../ConnectionModal";
import { useAdapter } from "../../Adapter";
import { shortAddress } from "@unifiprotocol/utils";
import { ConnectedModal } from "../ConnectedModal";

export const ConnectionAction = () => {
  const { adapter } = useAdapter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ConnectionModal
        isOpen={!adapter?.adapter.isConnected() && isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={() => setIsModalOpen(false)}
        onConnectionError={() => setIsModalOpen(false)}
      />
      <ConnectedModal
        isOpen={!!adapter?.adapter.isConnected() && isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <PrimaryButton onClick={() => setIsModalOpen(true)}>
        {adapter && adapter.adapter.isConnected()
          ? shortAddress(adapter.adapter.getAddress(), 6)
          : "Connect"}
      </PrimaryButton>
    </>
  );
};
