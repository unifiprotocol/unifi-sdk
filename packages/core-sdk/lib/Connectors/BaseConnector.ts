import { ConnectorEvent, IConnectorAdapters } from "../Types";
import EventEmitter from "eventemitter3";
import { IConnector, OnNetworkChangeOptions } from "../Types/IConnector";
import { Callback } from "../Utils/Typings";
import { IBlockchainConfig } from "../Types/IBlockchainConfig";
import { IConnectorMetadata } from "../Types";
import { blockchainConfigMap } from "../Blockchains";

export abstract class BaseConnector implements IConnector {
  protected emitter = new EventEmitter<ConnectorEvent>();
  _adapter: IConnectorAdapters | undefined;

  constructor(
    public readonly metadata: IConnectorMetadata,
    public config: IBlockchainConfig
  ) {}

  protected abstract _connect(): Promise<IConnectorAdapters>;

  async connect(): Promise<IConnectorAdapters> {
    if (this.adapter) {
      return this.adapter;
    }

    const adapters = await this._connect();
    this.adapter = adapters;

    return adapters;
  }

  async changeNetwork(config: IBlockchainConfig): Promise<IConnectorAdapters> {
    const walletSupportTargetBlockchain = config.wallets.some(
      (connector) => connector.displayName === this.metadata.displayName
    );
    if (!walletSupportTargetBlockchain) {
      throw new Error("Wallet doesn't support target blockchain.");
    }

    const adapters = await this._connect();
    this.config = config;

    return adapters;
  }

  async disconnect(): Promise<void> {
    if (this.adapter) {
      this.emitter.emit("Disconnect", {});
      this.emitter.removeAllListeners();
      this.adapter = undefined;
    }
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

  get adapter(): IConnectorAdapters | undefined {
    return this._adapter;
  }

  set adapter(adapter: IConnectorAdapters | undefined) {
    this._adapter = adapter;
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
