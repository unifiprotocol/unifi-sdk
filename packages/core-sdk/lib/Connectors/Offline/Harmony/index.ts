import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { harmonyMetadata } from "./HarmonyMetadata";

export class HarmonyConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, harmonyMetadata);
  }

  async connect(): Promise<IAdapter> {
    // TODO network cannot be hardcoded here
    this.adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        "https://api.harmony.one",
        EthChainIds.Harmony
      )
    );
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
