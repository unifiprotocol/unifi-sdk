import { ConnectorEvent, IConnectorAdapters } from "../Types";
import EventEmitter from "eventemitter3";
import { IConnector } from "../Types/IConnector";
import { Callback } from "../Utils/Typings";
import { IBlockchainConfig } from "../Types/IBlockchainConfig";
import { IConnectorMetadata } from "../Types";

export abstract class BaseConnector implements IConnector {
  protected emitter = new EventEmitter<ConnectorEvent>();

  constructor(
    public readonly metadata: IConnectorMetadata,
    public readonly config: IBlockchainConfig
  ) {}

  abstract connect(): Promise<IConnectorAdapters>;

  async disconnect(): Promise<void> {
    this.emitter.emit("Disconnect", {});
    this.emitter.removeAllListeners();
  }

  get isWallet(): boolean {
    return this.metadata.isWallet;
  }

  get name(): string {
    return this.metadata.name;
  }

  get displayName(): string {
    return this.metadata.displayName;
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  on(event: ConnectorEvent, callback: Callback): void {
    this.emitter.on(event, callback);
  }

  off(event: ConnectorEvent, callback: Callback): void {
    this.emitter.off(event, callback);
  }
}
