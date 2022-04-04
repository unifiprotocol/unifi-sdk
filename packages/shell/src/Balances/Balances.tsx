import { useCallback, useEffect, useState } from "react";
import { BN } from "@unifiprotocol/utils";
import { useBalances } from ".";
import { useAdapter } from "../Adapter";
import { BalanceOf } from "../Contracts/ERC20/balanceOf";
import Clocks from "../Services/Clocks";
import { GenericUseCase } from "@unifiprotocol/core-sdk";
import { ShellEventBus } from "../EventBus";
import {
  AddCurrency,
  AddCurrencyEvent,
  RefreshBalancesEvent,
  WipeEvent,
} from "../EventBus/Events/BalancesEvents";
import { coinGeckoService } from "../Services/Coingecko";
import { AddressChangedEvent } from "../EventBus/Events/AdapterEvents";

export const BalancesUpdater = () => {
  const [initialTrigger, setInitialTrigger] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { balances, updateBalances, addToken, wipe, updateUnfiPrice } =
    useBalances();
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
    const fn = () => {
      !refreshing && update();
    };
    Clocks.on("SIXTY_SECONDS", fn);
    return () => {
      Clocks.off("SIXTY_SECONDS", fn);
    };
  }, [update, refreshing]);

  useEffect(() => {
    const fn = () =>
      coinGeckoService.getUnfiPrice().then((price) => {
        localStorage.setItem("UNFI_PRICE", price);
        updateUnfiPrice(price);
      });
    Clocks.on("TWO_MINUTES", fn);
    return () => {
      Clocks.off("TWO_MINUTES", fn);
    };
  }, [updateUnfiPrice]);

  useEffect(() => {
    const fn = (event: AddCurrency) => addToken(event.payload);
    ShellEventBus.on(AddCurrencyEvent, fn);
    return () => {
      ShellEventBus.off(AddCurrencyEvent, fn);
    };
  }, [addToken]);

  useEffect(() => {
    const fn = () => {
      update();
    };
    ShellEventBus.on(RefreshBalancesEvent, fn);
    return () => {
      ShellEventBus.off(RefreshBalancesEvent, fn);
    };
  }, [update]);

  useEffect(() => {
    const fn = () => {
      wipe();
      setInitialTrigger(false);
    };
    ShellEventBus.on(WipeEvent, fn);
    return () => {
      ShellEventBus.off(WipeEvent, fn);
    };
  }, [refreshing, update, wipe]);

  useEffect(() => {
    const fn = () => {
      wipe();
      update();
    };
    ShellEventBus.on(AddressChangedEvent, fn);
    return () => {
      ShellEventBus.off(AddressChangedEvent, fn);
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
