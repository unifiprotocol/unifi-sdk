import { IAdapter } from "../Adapters";
import { Blockchains, ConnectorEvent } from "../Types";
import EventEmitter from "eventemitter3";
import { IConnector } from "./IConnector";
import { ConnectorMetadata } from "../Entities";

type Callback = (...args: any[]) => void;
export abstract class BaseConnector implements IConnector {
  protected emitter = new EventEmitter<ConnectorEvent>();
  protected adapter: IAdapter;
  constructor(
    protected blockchain: Blockchains,
    protected metadata: ConnectorMetadata
  ) {}

  abstract connect(): Promise<IAdapter>;
  async disconnect(): Promise<void> {
    this.adapter.setAddress("");
    this.adapter.resetContracts();
    this.emitter.emit("Disconnect", {});
    this.emitter.removeAllListeners();
  }

  isWallet(): boolean {
    return this.metadata.isWallet;
  }

  async isAvailable() {
    return true;
  }

  getMedatata() {
    return this.metadata;
  }

  on(event: ConnectorEvent, callback: Callback) {
    this.emitter.on(event, callback);
  }

  off(event: ConnectorEvent, callback: Callback) {
    this.emitter.off(event, callback);
  }
}