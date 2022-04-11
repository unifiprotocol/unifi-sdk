import { InvalidNetworkError, WalletNotDetectedError } from "../../Errors";
import { MetamaskConnector } from "./MetamaskConnector";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";
import { Blockchains, IConnectorAdapters, WalletConnectors } from "../../Types";
import { MulticallBaseAdapter } from "../../Adapters/Multicall";
import { HarmonyAdapter } from "../../Blockchains/Harmony/Adapters/HarmonyAdapter";

declare global {
  interface Window {
    ethereum: any;
    harmony: any;
  }
}

export class MathWalletConnector extends MetamaskConnector {
  constructor(blockchainConfig: IBlockchainConfig) {
    super(blockchainConfig, {
      name: WalletConnectors.MathWallet,
      displayName: "Mathwallet",
      isWallet: true,
    });
  }

  async _connect(): Promise<IConnectorAdapters> {
    if (this.config.blockchain !== Blockchains.Harmony) {
      return super._connect();
    }
    return this.connectToHarmony();
  }

  async connectToHarmony(): Promise<IConnectorAdapters> {
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.displayName);
    }

    const chainId = this.getAgent().network.chain_id;

    if (chainId !== 1) {
      throw new InvalidNetworkError(chainId);
    }

    const account = await this.getAgent().getAccount();
    const address = account.address;
    const adapter = new HarmonyAdapter(this.config);

    adapter.setAddress(address);
    adapter.setProvider(this.getAgent());
    const multicall = new MulticallBaseAdapter(adapter);

    return {
      adapter,
      multicall,
    };
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isMathWallet;
  }

  getAgent(): any {
    return this.config.blockchain === Blockchains.Harmony
      ? window.harmony
      : window.ethereum;
  }
}
