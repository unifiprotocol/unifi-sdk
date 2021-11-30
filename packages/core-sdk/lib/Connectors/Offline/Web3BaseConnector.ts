import { IAdapter } from "../../Types/IAdapter";
import { ConnectorEvent } from "../../Types";
import EventEmitter from "eventemitter3";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";
import { IConnectorMetadata } from "../../Types";
import { BaseConnector } from "../BaseConnector";
import { ethers } from "ethers";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";

export class Web3BaseConnector extends BaseConnector {
  protected emitter = new EventEmitter<ConnectorEvent>();
  constructor(
    private jsonRpcUrl: string,
    metadata: IConnectorMetadata = {
      displayName: "Web3",
      isWallet: false,
      name: "Web3",
    },
    config: IBlockchainConfig
  ) {
    super(metadata, config);
  }
  async connect(): Promise<IAdapter> {
    const adapter = new Web3BaseAdapter(this.config);
    adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        this.jsonRpcUrl,
        this.config.chainId
      )
    );
    return adapter;
  }
}
