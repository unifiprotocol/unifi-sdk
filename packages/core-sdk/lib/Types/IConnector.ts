import { ConnectorEvent } from "../Types";
import { IAdapter } from "./IAdapter";
import { Callback } from "../Utils/Typings";
import { IMulticallAdapter } from "./IMulticallAdapter";

export interface IConnectorAdapters {
  adapter: IAdapter;
  multicall: IMulticallAdapter;
}

export interface IConnector {
  isWallet: boolean;
  name: string;
  displayName: string;
  _adapter: IConnectorAdapters | undefined;

  connect(): Promise<IConnectorAdapters>;
  disconnect(): Promise<void>;

  isAvailable(): Promise<boolean>;
  on(event: ConnectorEvent, callback: Callback): void;
  off(event: ConnectorEvent, callback: Callback): void;
}
