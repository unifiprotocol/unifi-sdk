import { useCallback, useEffect, useState } from "react";
import { BN } from "@unifiprotocol/utils";
import { useBalances } from ".";
import { useAdapter } from "../Adapter";
import { BalanceOf } from "../Contracts/ERC20/balanceOf";
import Clocks from "../Services/Clocks";
import ShellBus from "../Services/ShellBus";
import { GenericUseCase } from "@unifiprotocol/core-sdk";

export const BalancesUpdater = () => {
  const [initialTrigger, setInitialTrigger] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { balances, updateBalances, addToken, wipe } = useBalances();
  const { adapter, activeChain } = useAdapter();

  const update = useCallback(async () => {
    try {
      if (!adapter?.adapter.isConnected()) return;
      setRefreshing(true);

      const result: typeof balances = [];
      const filteredBalances = balances.filter(
        (b) => !b.currency.equals(activeChain.nativeToken)
      );
      const multicallRequests = filteredBalances.reduce(
        (calls: GenericUseCase[], b) => {
          adapter.adapter.initializeToken(b.currency.address);
          calls.push(
            new BalanceOf({
              tokenAddress: b.currency.address,
              owner: adapter.adapter.getAddress(),
            })
          );
          return calls;
        },
        []
      );

      const nativeBalance = await adapter.adapter.getBalance();
      const responses = await adapter.multicall.execute(multicallRequests);
      responses.forEach((res, idx) => {
        result.push({
          currency: filteredBalances[idx].currency,
          balance: BN(res.value ?? "0").toFixed(),
        });
      });

      result.push({
        currency: activeChain.nativeToken,
        balance: nativeBalance.balance,
      });

      updateBalances(result);
    } catch (err) {
      console.error("🚀 ~ file: Balances.tsx ~ line 41 ~ update ~ err", err);
    } finally {
      setRefreshing(false);
    }
  }, [
    activeChain.nativeToken,
    adapter?.adapter,
    adapter?.multicall,
    balances,
    updateBalances,
  ]);

  useEffect(() => {
    const fn = () => !refreshing && update();
    Clocks.on("SIXTY_SECONDS", fn);
    return () => {
      Clocks.off("SIXTY_SECONDS", fn);
    };
  }, [update, refreshing]);

  useEffect(() => {
    ShellBus.on("ADD_CURRENCY", addToken);
    return () => {
      ShellBus.off("ADD_CURRENCY", addToken);
    };
  }, [addToken]);

  useEffect(() => {
    const fn = () => !refreshing && update();
    ShellBus.on("REFRESH_BALANCES", fn);
    return () => {
      ShellBus.off("REFRESH_BALANCES", fn);
    };
  }, [refreshing, update]);

  useEffect(() => {
    const fn = () => {
      wipe();
      setInitialTrigger(false);
    };
    ShellBus.on("WIPE", fn);
    return () => {
      ShellBus.off("WIPE", fn);
    };
  }, [refreshing, update, wipe]);

  useEffect(() => {
    if (!initialTrigger && adapter?.adapter.isConnected() && !refreshing) {
      update();
      setInitialTrigger(true);
    }
  }, [adapter, initialTrigger, refreshing, update]);

  return <></>;
};
