import { Dispatch, createContext } from "react";
import { AdapterAction } from "../Adapter/State/AdapterActions";
import { BalanceAction } from "../Balances/State/BalanceActions";
import { getShellInitialState, ShellState } from "./ShellState";

export type ShellAction = AdapterAction | BalanceAction;

export const ShellContext = createContext<{
  state: ShellState;
  dispatch: Dispatch<ShellAction>;
}>({
  state: getShellInitialState(),
  dispatch: () => null,
});
