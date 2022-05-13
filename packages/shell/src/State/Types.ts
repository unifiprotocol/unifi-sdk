import { ShellAction } from "./ShellContext";
import { ShellState } from "./ShellState";

/**
 * We have a single state on ShellState with properties on the root
 * representing different features of the shell like the Adapter and the Balances.
 *
 * A partial reducer will be able to:
 *  - modify only the state in one of those properties in the root.
 *  - read the whole state but not modify it
 * @constructor
 * @param {Type} state - The partial state which is responsible of
 * @param {ShellAction} action - The action that triggered the reducer
 * @param {ShellState} rootState - The root state
 * @returns {Type} state - The partial state reduced
 *
 */
export type ShellPartialReducer<Type> = (
  state: Type,
  action: ShellAction,
  rootState: ShellState
) => Type;

export interface ShellBaseAction<Type, Payload> {
  type: Type;
  payload: Payload;
}
