import React, { useMemo, useState } from "react";
import { PrimaryButton } from "@unifiprotocol/uikit";
import { ConnectionModal } from "../ConnectionModal";
import { useAdapter } from "../../Adapter";
import { shortAddress } from "@unifiprotocol/utils";
import { ConnectedModal } from "../ConnectedModal";
import { useBalances } from "../../Balances";
import { NativeBalance, NativeBalanceSymbol } from "./Styles";

export const ConnectionAction = () => {
  const { adapter, connector, activeChain } = useAdapter();
  const { getBalanceByCurrency } = useBalances();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nativeBalances = useMemo(() => {
    const balance = getBalanceByCurrency(activeChain.nativeToken);
    return activeChain.nativeToken.toFactorized(balance, 4);
  }, [activeChain.nativeToken, getBalanceByCurrency]);

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
      {connector.isWallet && (
        <NativeBalance>
          {nativeBalances}{" "}
          <NativeBalanceSymbol>
            {activeChain.nativeToken.symbol}
          </NativeBalanceSymbol>
        </NativeBalance>
      )}
      <PrimaryButton onClick={() => setIsModalOpen(true)}>
        {adapter && adapter.adapter.isConnected()
          ? shortAddress(adapter.adapter.getAddress(), 6)
          : "Connect"}
      </PrimaryButton>
    </>
  );
};
