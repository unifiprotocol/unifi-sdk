import { ConnectorEvent } from "../Types";
import { IAdapter } from "./IAdapter";
import { Callback } from "../Utils/Typings";

export interface IConnector {
  isWallet: boolean;
  name: string;
  displayName: string;

  connect(): Promise<IAdapter>;
  disconnect(): Promise<void>;

  isAvailable(): Promise<boolean>;
  on(event: ConnectorEvent, callback: Callback): void;
  off(event: ConnectorEvent, callback: Callback): void;
}
