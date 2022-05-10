import { IConnector } from "@unifiprotocol/core-sdk";
import { IConfig } from "../../Config";
import { ShellBaseAction } from "../../State/Types";

export enum AdapterActionKind {
  CONNECT = "CONNECT",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  DISCONNECT = "DISCONNECT",
  SWITCH_CHAIN = "SWITCH_CHAIN",
}

export type AdapterConnectAction = ShellBaseAction<
  AdapterActionKind.CONNECT,
  IConnector
>;
export type AdapterConnectionErrorAction = ShellBaseAction<
  AdapterActionKind.CONNECTION_ERROR,
  Error
>;
export type AdapterDisconnectAction = ShellBaseAction<
  AdapterActionKind.DISCONNECT,
  any
>;
export type AdapterSwitchChainAction = ShellBaseAction<
  AdapterActionKind.SWITCH_CHAIN,
  IConfig
>;

export type AdapterAction =
  | AdapterConnectAction
  | AdapterConnectionErrorAction
  | AdapterDisconnectAction
  | AdapterSwitchChainAction;
