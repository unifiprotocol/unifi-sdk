import { Blockchains } from "../../../Types";
import { metamaskWalletMetadata } from "./MetamaskMetadata";
import { MetamaskBaseConnector } from "./MetamaskBaseConnector";

export class MetamaskConnector extends MetamaskBaseConnector {
  constructor(protected blockchain: Blockchains) {
    super(blockchain, metamaskWalletMetadata);
  }
}
