import { ShellAction } from "./ShellContext";
import { ShellState } from "./ShellState";

export type ShellPartialReducer<Type> = (
  state: Type,
  action: ShellAction,
  rootState: ShellState
) => Type;

export interface ShellBaseAction<Type, Payload> {
  type: Type;
  payload: Payload;
}
