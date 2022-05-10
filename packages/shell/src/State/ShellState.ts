import {
  AdapterState,
  getAdapterInitialState,
} from "../Adapter/State/AdapterState";
import {
  BalancesState,
  getBalanceInitialState,
} from "../Balances/State/BalanceState";

export interface ShellState {
  adapter: AdapterState;
  balances: BalancesState;
}

export const getShellInitialState = () => ({
  adapter: getAdapterInitialState(),
  balances: getBalanceInitialState(),
});
