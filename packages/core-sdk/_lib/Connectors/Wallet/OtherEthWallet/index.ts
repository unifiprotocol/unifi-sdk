import { Blockchains } from "../../../Types";
import { web3AdapterFactory } from "../../../Adapters";
import { MetamaskBaseConnector } from "../Metamask/MetamaskBaseConnector";
import { otherEthWalletMetadata } from "./OtherEthWalletMetadata";

export class OtherEthWalletConnector extends MetamaskBaseConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, otherEthWalletMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent();
  }
}
