import { AdapterReducer } from "../Adapter/State/AdapterReducer";
import { BalancesReducer } from "../Balances/State/BalancesReducer";
import { ShellAction } from "./ShellContext";
import { ShellState } from "./ShellState";

export const ShellReducer = (
  state: ShellState,
  action: ShellAction
): ShellState => {
  return {
    ...state,
    adapter: AdapterReducer(state.adapter, action, state),
    balances: BalancesReducer(state.balances, action, state),
  };
};
