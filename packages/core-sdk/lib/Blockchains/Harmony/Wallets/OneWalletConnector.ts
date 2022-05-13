import { InvalidNetworkError, WalletNotDetectedError } from "../../../Errors";
import {
  IBlockchainConfig,
  WalletConnectors,
  IConnectorAdapters,
} from "../../../Types";
import { BaseConnector } from "../../../Connectors";
import { HarmonyAdapter, HarmonyProvider } from "../Adapters/HarmonyAdapter";
import { MulticallBaseAdapter } from "../../../Adapters/Multicall";

declare global {
  interface Window {
    onewallet: any;
  }
}

export class OneWalletConnector extends BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      {
        name: WalletConnectors.HarmonyOneWallet,
        displayName: "Harmony One Wallet",
        isWallet: true,
      },
      config
    );
  }

  protected async _forceNetwork() {}

  async _connect(): Promise<IConnectorAdapters> {
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.displayName);
    }

    const chainId = this.getAgent().network.chain_id;

    if (chainId !== 1) {
      throw new InvalidNetworkError(`${chainId}`);
    }

    const account = await this.getAgent().getAccount();

    const address = account.address;

    const adapter = new HarmonyAdapter(this.config);
    adapter.setAddress(address);
    adapter.setProvider(this.getAgent());

    const multicall = new MulticallBaseAdapter(adapter);

    return { adapter, multicall };
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isOneWallet;
  }

  protected getAgent(): HarmonyProvider {
    return window.onewallet;
  }

  async disconnect(): Promise<void> {
    await super.disconnect();
    return this.getAgent().forgetIdentity();
  }
}
