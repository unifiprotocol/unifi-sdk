import { AdapterReducer } from "../Adapter/State/AdapterReducer";
import { BalanceReducer } from "../Balances/State/BalanceReducer";
import { ShellAction } from "./ShellContext";
import { ShellState } from "./ShellState";

export const ShellReducer = (
  state: ShellState,
  action: ShellAction
): ShellState => {
  return {
    ...state,
    adapter: AdapterReducer(state.adapter, action, state),
    balances: BalanceReducer(state.balances, action, state),
  };
};
