import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { polygonMetadata } from "./PolygonMetadata";
import { web3AdapterFactory } from "../../../Adapters";

export class PolygonConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, polygonMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }

  async connect(): Promise<IAdapter> {
    // TODO network cannot be hardcoded here
    this.adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        "https://polygon-rpc.com",
        EthChainIds.Polygon
      )
    );
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
