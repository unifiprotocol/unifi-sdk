import React, { useState } from "react";
import { PrimaryButton } from "@unifiprotocol/uikit";
import { ConnectionModal } from "../ConnectionModal";
import { useAdapter } from "../../Adapter";

export const ConnectionAction = () => {
  const { adapter } = useAdapter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={() => setIsModalOpen(false)}
        onConnectionError={() => setIsModalOpen(false)}
      />
      <PrimaryButton onClick={() => setIsModalOpen(true)}>
        {adapter && adapter.adapter.isConnected()
          ? adapter.adapter.getAddress()
          : "Connect"}
      </PrimaryButton>
    </>
  );
};
