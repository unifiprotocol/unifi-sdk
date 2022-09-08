import { ConnectorEvent } from "../../Types";
import EventEmitter from "eventemitter3";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";
import { IConnectorMetadata, IConnectorAdapters } from "../../Types";
import { BaseConnector } from "../BaseConnector";
import { ethers } from "ethers";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import { Web3MulticallAdapter } from "../../Adapters";

export class Web3BaseConnector extends BaseConnector {
  protected emitter = new EventEmitter<ConnectorEvent>();
  constructor(
    private nodeUrl: string,
    metadata: IConnectorMetadata = {
      displayName: "Web3",
      isWallet: false,
      name: "Web3",
    },
    config: IBlockchainConfig
  ) {
    super(metadata, config);
  }

  async _connect(): Promise<IConnectorAdapters> {
    const adapter = new Web3BaseAdapter(this.config);

    const provider = this.buildWeb3Provider();
    adapter.setProvider(provider);
    const multicall = new Web3MulticallAdapter(adapter);
    return { adapter, multicall };
  }

  private buildWeb3Provider() {
    const protocol = new URL(this.nodeUrl).protocol;

    if (/^http/.test(protocol)) {
      return new ethers.providers.StaticJsonRpcProvider(
        this.nodeUrl,
        this.config.chainId
      );
    } else if (/^ws/.test(protocol)) {
      return new ethers.providers.WebSocketProvider(
        this.nodeUrl,
        this.config.chainId
      );
    } else {
      throw new Error(
        `Web3BaseConnector does not support ${protocol.slice(0, -1)} protocol`
      );
    }
  }
}
