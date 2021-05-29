import { IAdapter } from "@root/Adapters/IAdapter";
import { Blockchains, ConnectorEvent } from "@root/Types";
import EventEmitter from "eventemitter3";
import { IConnector } from "./IConnector";

type Callback = (...args: any[]) => void;
export abstract class BaseConnector implements IConnector {
  protected emitter = new EventEmitter<ConnectorEvent>();

  constructor(
    protected adapter: IAdapter,
    protected blockchain: Blockchains,
    protected _isWallet: boolean
  ) {}

  abstract connect(): Promise<IAdapter>;
  abstract logout(): Promise<void>;

  isWallet(): boolean {
    return this._isWallet;
  }

  on(event: ConnectorEvent, callback: Callback) {
    this.emitter.on(event, callback);
  }
  off(event: ConnectorEvent, callback: Callback) {
    this.emitter.off(event, callback);
  }
}
