import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";

export class CloudflareConnector extends OfflineConnector {
  async connect(): Promise<IAdapter> {
    this.adapter.setProvider(new ethers.providers.CloudflareProvider());
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
