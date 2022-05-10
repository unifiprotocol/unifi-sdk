import { useCallback, useContext } from "react";
import { Blockchains, BN, Currency } from "@unifiprotocol/utils";
import { GenericUseCase } from "@unifiprotocol/core-sdk";
import { useAdapter } from "../Adapter/useAdapter";
import { BalanceOf } from "../Contracts/ERC20/balanceOf";

import { ShellContext } from "../State/ShellContext";
import { BalancesState } from "./State/BalanceState";
import { BalancesActionKind } from "./State/BalancesActions";

export const useBalances = () => {
  const { state, dispatch } = useContext(ShellContext);
  const { adapter, multicallAdapter, activeChain } = useAdapter();
  const { balances, unfiPrice, refreshingBalances } = state.balances;

  const updateBalances = useCallback(
    (balances: BalancesState["balances"], blockchain: Blockchains) => {
      dispatch({
        type: BalancesActionKind.UPDATE_BALANCES,
        payload: { balances, blockchain },
      });
    },
    [dispatch]
  );

  const setRefreshing = useCallback(
    (refreshing: boolean) =>
      dispatch({
        type: BalancesActionKind.SET_UPDATING_BALANCES,
        payload: refreshing,
      }),
    [dispatch]
  );

  const addToken = useCallback(
    (token: Currency) => {
      dispatch({ type: BalancesActionKind.ADD_TOKEN, payload: token });
    },
    [dispatch]
  );

  const wipe = useCallback(() => {
    dispatch({ type: BalancesActionKind.WIPE, payload: undefined });
  }, [dispatch]);

  const updateUnfiPrice = useCallback(
    (unfiPrice: string) => {
      dispatch({ type: BalancesActionKind.UPDATE_UNFI, payload: unfiPrice });
    },
    [dispatch]
  );

  const getBalanceByCurrency = useCallback(
    (currency: Currency) => {
      const currentBalances = balances.find((b) => b.currency.equals(currency));
      return currentBalances?.balance ?? "0";
    },
    [balances]
  );

  const getBalanceByAddress = useCallback(
    (address: string) => {
      const currentBalances = balances.find(
        (b) => b.currency.address.toLowerCase() === address.toLowerCase()
      );
      return currentBalances?.balance ?? "0";
    },
    [balances]
  );

  const refresh = useCallback(async () => {
    try {
      if (refreshingBalances) return;
      if (!multicallAdapter || !adapter || !adapter.isConnected()) return;

      setRefreshing(true);

      const result: typeof balances = [];
      const filteredBalances = balances.filter(
        (b) => !b.currency.equals(activeChain.nativeToken)
      );
      await Promise.all(
        filteredBalances.map((b) => adapter.initializeToken(b.currency.address))
      );

      const multicallRequests = filteredBalances.reduce(
        (calls: GenericUseCase[], b) => {
          calls.push(
            new BalanceOf({
              tokenAddress: b.currency.address,
              owner: adapter.getAddress(),
            })
          );
          return calls;
        },
        []
      );

      const nativeBalance = await adapter.getBalance();

      const responses = await multicallAdapter
        .execute(multicallRequests)
        .then((res) => {
          if (activeChain.blockchain === Blockchains.Binance) {
            return res;
          }

          return new Promise((resolve) =>
            setTimeout(() => resolve(res), 10_000)
          ) as Promise<typeof res>;
        });

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

      updateBalances(result, activeChain.blockchain);
    } catch (err) {
      console.error("🚀 ~ file: Balances.tsx ~ line 41 ~ update ~ err", err);
    } finally {
      setRefreshing(false);
    }
  }, [
    refreshingBalances,
    multicallAdapter,
    adapter,
    setRefreshing,
    balances,
    activeChain.nativeToken,
    activeChain.blockchain,
    updateBalances,
  ]);

  return {
    refreshingBalances,
    refresh,
    balances,
    unfiPrice,
    updateBalances,
    addToken,
    wipe,
    updateUnfiPrice,
    getBalanceByCurrency,
    getBalanceByAddress,
  };
};
