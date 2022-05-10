import { useEffect, useState } from "react";
import { useBalances } from ".";
import { useAdapter } from "../Adapter";

import Clocks from "../Services/Clocks";
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

  const { refreshingBalances, addToken, refresh, wipe, updateUnfiPrice } =
    useBalances();
  const { adapter } = useAdapter();

  useEffect(() => {
    Clocks.on("SIXTY_SECONDS", refresh);
    return () => {
      Clocks.off("SIXTY_SECONDS", refresh);
    };
  }, [refresh]);

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
      refresh();
    };
    ShellEventBus.on(RefreshBalancesEvent, fn);
    return () => {
      ShellEventBus.off(RefreshBalancesEvent, fn);
    };
  }, [refresh]);

  useEffect(() => {
    const fn = () => {
      wipe();
      setInitialTrigger(false);
    };
    ShellEventBus.on(WipeEvent, fn);
    return () => {
      ShellEventBus.off(WipeEvent, fn);
    };
  }, [refreshingBalances, refresh, wipe]);

  useEffect(() => {
    const fn = () => {
      wipe();
      refresh();
    };
    ShellEventBus.on(AddressChangedEvent, fn);
    return () => {
      ShellEventBus.off(AddressChangedEvent, fn);
    };
  }, [refreshingBalances, refresh, wipe]);

  useEffect(() => {
    if (!initialTrigger && adapter?.isConnected() && !refreshingBalances) {
      refresh();
      setInitialTrigger(true);
    }
  }, [adapter, initialTrigger, refreshingBalances, refresh]);

  return <></>;
};
