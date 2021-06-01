import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { Blockchains } from "../../../Types";
import { cloudflareMetadata } from "./CloudflareMetadata";

export class CloudflareConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, cloudflareMetadata);
  }
  async connect(): Promise<IAdapter> {
    this.adapter.setProvider(new ethers.providers.CloudflareProvider());
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
