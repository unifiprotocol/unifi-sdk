import { Blockchains, Currency } from "@unifiprotocol/utils";
import { ShellBaseAction } from "../../State/Types";
import { BalancesState } from "./BalanceState";

export enum BalancesActionKind {
  ADD_TOKEN = "ADD_TOKEN",
  UPDATE_BALANCES = "UPDATE_BALANCES",
  SET_UPDATING_BALANCES = "SET_UPDATING_BALANCES",
  UPDATE_UNFI = "UPDATE_UNFI",
  WIPE = "WIPE",
}

type UpdateUnfiPriceAction = ShellBaseAction<
  BalancesActionKind.UPDATE_UNFI,
  BalancesState["unfiPrice"]
>;

type SetUpdatingBalancesAction = ShellBaseAction<
  BalancesActionKind.SET_UPDATING_BALANCES,
  boolean
>;

type AddTokenAction = ShellBaseAction<BalancesActionKind.ADD_TOKEN, Currency>;

type UpdateBalancesAction = ShellBaseAction<
  BalancesActionKind.UPDATE_BALANCES,
  { blockchain: Blockchains; balances: BalancesState["balances"] }
>;

type WipeBalancesAction = ShellBaseAction<BalancesActionKind.WIPE, void>;

export type BalanceAction =
  | UpdateUnfiPriceAction
  | SetUpdatingBalancesAction
  | UpdateBalancesAction
  | AddTokenAction
  | WipeBalancesAction;
