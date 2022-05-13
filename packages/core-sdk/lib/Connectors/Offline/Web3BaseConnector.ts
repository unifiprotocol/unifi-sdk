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

  protected async _forceNetwork(): Promise<void> {}

  async _connect(): Promise<IConnectorAdapters> {
    const adapter = new Web3BaseAdapter(this.config);
    adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        this.jsonRpcUrl,
        this.config.chainId
      )
    );
    const multicall = new Web3MulticallAdapter(adapter);
    return { adapter, multicall };
  }
}
