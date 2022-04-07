import React, { useEffect, useMemo, useState } from "react";
import { DangerButton, PrimaryButton } from "@unifiprotocol/uikit";
import { ConnectionModal } from "../ConnectionModal";
import { useAdapter } from "../../Adapter";
import { shortAddress } from "@unifiprotocol/utils";
import { ConnectedModal } from "../ConnectedModal";
import { useBalances } from "../../Balances";
import { NativeBalance, NativeBalanceSymbol } from "./Styles";
import { InvalidNetworkError } from "@unifiprotocol/core-sdk";
import { useTranslation } from "react-i18next";
import { ShellEventBus } from "../../EventBus";
import { OpenConnectionModalEvent } from "../../EventBus/Events/BlockchainEvents";

export const ConnectionAction = () => {
  const { t } = useTranslation();
  const { adapter, connector, activeChain, walletError } = useAdapter();
  const { getBalanceByCurrency } = useBalances();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ConnectButton = useMemo(() => {
    let buttonTxt = t("topbar.connect_a_wallet");
    if (!walletError) {
      return (
        <PrimaryButton onClick={() => setIsModalOpen(true)}>
          {buttonTxt}
        </PrimaryButton>
      );
    }
    if (walletError instanceof InvalidNetworkError) {
      buttonTxt = t("topbar.wrong_network");
    }
    return (
      <DangerButton onClick={() => setIsModalOpen(true)} variant="outline">
        {buttonTxt}
      </DangerButton>
    );
  }, [t, walletError]);

  const nativeBalances = useMemo(() => {
    const balance = getBalanceByCurrency(activeChain.nativeToken);
    return activeChain.nativeToken.toFactorized(balance, 4);
  }, [activeChain.nativeToken, getBalanceByCurrency]);

  useEffect(() => {
    const fn = () => {
      setIsModalOpen(true);
    };
    ShellEventBus.on(OpenConnectionModalEvent, fn);
    return () => {
      ShellEventBus.off(OpenConnectionModalEvent, fn);
    };
  });

  return (
    <>
      <ConnectionModal
        isOpen={!adapter?.isConnected() && isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={() => setIsModalOpen(false)}
        onConnectionError={() => setIsModalOpen(false)}
      />
      <ConnectedModal
        isOpen={!!adapter?.isConnected() && isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {connector?.isWallet && (
        <NativeBalance>
          {nativeBalances}{" "}
          <NativeBalanceSymbol>
            {activeChain.nativeToken.symbol}
          </NativeBalanceSymbol>
        </NativeBalance>
      )}
      {adapter && adapter.isConnected() && (
        <PrimaryButton onClick={() => setIsModalOpen(true)}>
          {shortAddress(adapter.getAddress(), 6)}
        </PrimaryButton>
      )}

      {(!adapter || !adapter.isConnected()) && ConnectButton}
    </>
  );
};
