import { IAdapter } from "@root/Adapters/IAdapter";

export interface IConnector {
  connect(): Promise<IAdapter>;
  logout(): Promise<void>;
  isWallet(): boolean;
  isAvailable(): Promise<boolean>;
  on(event: string, callback: (...args: any) => void): void;
  off(event: string, callback: (...args: any) => void): void;
}
