import { IAdapter } from "@root/Adapters/IAdapter";
import { ConnectorEvent } from "@root/Types";

export interface IConnector {
  connect(): Promise<IAdapter>;
  disconnect(): Promise<void>;
  isWallet(): boolean;
  isAvailable(): Promise<boolean>;
  on(event: ConnectorEvent, callback: (...args: any) => void): void;
  off(event: ConnectorEvent, callback: (...args: any) => void): void;
}
