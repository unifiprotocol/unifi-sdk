import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { Blockchains } from "../../../Types";
import { cloudflareMetadata } from "./CloudflareMetadata";
import { web3AdapterFactory } from "../../../Adapters";

export class CloudflareConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, cloudflareMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }
  async connect(): Promise<IAdapter> {
    this.adapter.setProvider(new ethers.providers.CloudflareProvider());
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
