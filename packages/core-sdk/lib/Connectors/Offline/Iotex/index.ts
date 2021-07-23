import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { iotexMetadata } from "./IotexMetadata";

export class IotexConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, iotexMetadata);
  }

  async connect(): Promise<IAdapter> {
    // TODO network cannot be hardcoded here
    this.adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        "https://babel-api.mainnet.iotex.io",
        EthChainIds.Iotex
      )
    );
    return this.adapter;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async logout(): Promise<void> {}
}
