import { InvalidNetworkError } from "../../Errors";
import { ethers } from "ethers";
import { BaseConnector } from "../BaseConnector";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { Web3MulticallAdapter } from "../../Adapters";
import {
  IConnectorAdapters,
  IBlockchainConfig,
  IAdapter,
  IConnectorMetadata,
  WalletConnectors,
} from "../../Types";
import { ForceNetworkError } from "../../Errors/ForceNetworkError";
import { hexToDec } from "@unifiprotocol/utils";

export class WalletConnectConnector extends BaseConnector {
  private agent: WalletConnectProvider;
  constructor(
    config: IBlockchainConfig,
    metadata: IConnectorMetadata = {
      name: WalletConnectors.WalletConnect,
      displayName: "WalletConnect",
      isWallet: true,
    }
  ) {
    super(metadata, config);
  }

  _initAgent() {
    return new WalletConnectProvider({
      rpc: {
        [this.config.chainId]: this.config.publicRpc,
      },
      chainId: this.config.chainId,
      qrcode: true,
    });
  }

  async _connect(): Promise<IConnectorAdapters> {
    this.agent = this._initAgent();
    const { accounts } = await this.agent.connector
      .connect({
        chainId: this.config.chainId,
      })
      .catch((err) => {
        this.agent = this._initAgent();
        throw err;
      });

    const address = ethers.utils.getAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(this.agent);

    const { chainId } = await provider.getNetwork();
    const chainIdStr = `${chainId}`;

    const adapter = new Web3BaseAdapter(this.config);
    adapter.setAddress(address);
    adapter.setProvider(provider);

    const multicall = new Web3MulticallAdapter(adapter);

    const isValidNetwork = await adapter.isValidNetwork(chainIdStr);
    if (!isValidNetwork) {
      throw new InvalidNetworkError(chainIdStr);
    }

    this.initEventController();

    return { adapter, multicall };
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  protected getAgent(): WalletConnectProvider {
    return this.agent;
  }

  private async initEventController(): Promise<void> {
    const agent = this.getAgent();

    this.on("Disconnect", () => {
      agent.disconnect();
    });
  }
}
