import {
  InvalidNetworkError,
  RejectedByUser,
  WalletNotDetectedError,
} from "../../Errors";
import { ethers, utils } from "ethers";
import { BaseConnector } from "../BaseConnector";
import { hexToDec } from "@unifiprotocol/utils";
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
    this.agent = this._initAgent();
  }

  _initAgent() {
    return new WalletConnectProvider({
      rpc: {
        [this.config.chainId]: this.config.publicRpc,
      },
      qrcode: true,
    });
  }

  async _connect(): Promise<IConnectorAdapters> {
    const { accounts } = await this.agent.connector
      .connect({
        chainId: this.config.chainId,
      })
      .catch((err) => {
        this.agent = this._initAgent();
        throw err;
      });

    await this._forceNetwork(this.config).catch(() => null);

    const address = ethers.utils.getAddress(accounts[0]);

    const provider = new ethers.providers.Web3Provider(this.agent);

    const { chainId } = await provider.getNetwork();
    const chainIdStr = `${chainId}`;

    const adapter = new Web3BaseAdapter(this.config);

    adapter.setAddress(address);
    adapter.setProvider(provider);

    const multicall = new Web3MulticallAdapter(adapter);
    this.initEventController(adapter);

    const isValidNetwork = await adapter.isValidNetwork(chainIdStr);

    if (!isValidNetwork) {
      throw new InvalidNetworkError(chainIdStr);
    }

    return { adapter, multicall };
  }

  protected async _forceNetwork({
    chainId,
    blockchain,
    nativeToken,
    publicRpc,
  }: IBlockchainConfig) {
    const agent = this.isAvailable() && this.getAgent();
    if (!agent) {
      throw new WalletNotDetectedError(this.metadata.name);
    }
    try {
      const success = await agent
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(chainId) }],
        })
        .then(() => true)
        .catch(() => false);
      if (!success) {
        await agent.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: utils.hexValue(chainId),
              chainName: blockchain,
              nativeCurrency: {
                name: nativeToken.name,
                symbol: nativeToken.symbol,
                decimals: nativeToken.decimals,
              },
              rpcUrls: [publicRpc],
            },
          ],
        });
        await agent.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(chainId) }],
        });
      }
    } catch (e) {
      throw new ForceNetworkError();
    }
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  protected getAgent(): WalletConnectProvider {
    return this.agent;
  }

  async initEventController(adapter: IAdapter): Promise<void> {
    this.getAgent().on("accountsChanged", ([address]: string[]) =>
      adapter.setAddress(address)
    );

    this.getAgent().on("chainChanged", (chainId: string) => {
      this.emitter.emit("NetworkChanged", chainId);
    });

    this.on("Disconnect", () => this.getAgent().disconnect());
  }
}
