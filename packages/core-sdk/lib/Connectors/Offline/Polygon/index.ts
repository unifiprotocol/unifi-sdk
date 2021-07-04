import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { polygonMetadata } from "./PolygonMetadata";

export class PolygonConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, polygonMetadata);
  }

  async connect(): Promise<IAdapter> {
    // TODO network cannot be hardcoded here
    this.adapter.setProvider(
      new ethers.providers.JsonRpcProvider(
        "https://rpc-mainnet.maticvigil.com/",
        EthChainIds.Polygon
      )
    );
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
