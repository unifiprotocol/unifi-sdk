import { Blockchains } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { OfflineConnector } from "../OfflineConnector";

import { iconMetadata } from "./IconMetadata";
import { IconAdapter } from "../../../Adapters/Icon/IconAdapter";
import IconService from "icon-sdk-js";

export class IconConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, iconMetadata);
    this.adapter = new IconAdapter();
  }

  async connect(): Promise<IAdapter> {
    const httpProvider = new IconService.HttpProvider(
      "https://ctz.solidwallet.io/api/v3"
    );
    this.adapter.setProvider(new IconService(httpProvider));
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
