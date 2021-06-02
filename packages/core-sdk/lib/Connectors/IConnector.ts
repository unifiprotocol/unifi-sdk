import { IAdapter } from "../Adapters";
import { ConnectorMetadata } from "../Entities";
import { ConnectorEvent } from "../Types";

export interface IConnector {
  connect(): Promise<IAdapter>;
  disconnect(): Promise<void>;
  isWallet(): boolean;
  isAvailable(): Promise<boolean>;
  getMedatata(): ConnectorMetadata;
  on(event: ConnectorEvent, callback: (...args: any) => void): void;
  off(event: ConnectorEvent, callback: (...args: any) => void): void;
}
