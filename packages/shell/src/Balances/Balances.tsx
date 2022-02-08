import { useCallback, useEffect, useState } from "react";
import { BN } from "@unifiprotocol/utils";
import { useBalances } from ".";
import { useAdapter } from "../Adapter";
import { BalanceOf } from "../Contracts/ERC20/balanceOf";
import Clocks from "../Services/Clocks";

export const BalancesUpdater = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { balances, updateBalances } = useBalances();
  const { adapter, activeChain } = useAdapter();

  const update = useCallback(async () => {
    try {
      if (!adapter?.adapter.isConnected()) return;
      setRefreshing(true);
      const result: typeof balances = [];
      const multicallRequests = balances.map((b) => {
        adapter.adapter.initializeToken(b.currency.address);
        return new BalanceOf({
          tokenAddress: b.currency.address,
          owner: adapter.adapter.getAddress(),
        });
      });
      const nativeBalance = await adapter.adapter.getBalance();
      const responses = await adapter.multicall.execute(multicallRequests);
      responses.forEach((res, idx) => {
        result.push({
          currency: balances[idx].currency,
          balance: BN(res.value ?? "0").toFixed(),
        });
      });

      result.push({
        currency: activeChain.nativeToken,
        balance: nativeBalance.balance,
      });

      updateBalances(result);
    } catch (err) {
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
    if (adapter?.adapter.isConnected()) {
      update();
    }
  }, [adapter, update]);

  return <></>;
};
