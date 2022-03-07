import { ConnectorEvent } from "../Types";
import { IAdapter } from "./IAdapter";
import { Callback } from "../Utils/Typings";
import { IMulticallAdapter } from "./IMulticallAdapter";
import { IBlockchainConfig, IConnectorFactoryParams } from "..";

export interface IConnectorAdapters {
  adapter: IAdapter;
  multicall: IMulticallAdapter;
}

export interface IConnector {
  isWallet: boolean;
  name: string;
  displayName: string;
  adapter: IConnectorAdapters | undefined;
  readonly config: IBlockchainConfig;

  connect(): Promise<IConnectorAdapters>;
  disconnect(): Promise<void>;

  isAvailable(): Promise<boolean>;
  on(event: ConnectorEvent, callback: Callback): void;
  off(event: ConnectorEvent, callback: Callback): void;
}

export interface IWeb3ConnectorParams {
  jsonRpcUrl: string;
}

export type IWeb3ConnectorFactoryParams =
  IConnectorFactoryParams<IWeb3ConnectorParams>;
