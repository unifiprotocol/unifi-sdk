import { InvalidNetworkError, WalletNotDetectedError } from "../../Errors";
import { ethers } from "ethers";
import { BaseConnector } from "../BaseConnector";
import { hexToDec } from "@unifiprotocol/utils";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import { utils } from "ethers";

import { Web3MulticallAdapter } from "../../Adapters";
import {
  IConnectorAdapters,
  IBlockchainConfig,
  IAdapter,
  IConnectorMetadata,
  WalletConnectors,
} from "../../Types";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class MetamaskConnector extends BaseConnector {
  constructor(
    config: IBlockchainConfig,
    metadata: IConnectorMetadata = {
      name: WalletConnectors.Metamask,
      displayName: "Metamask",
      isWallet: true,
    }
  ) {
    super(metadata, config);
  }

  async _connect(
    config: IBlockchainConfig = this.config
  ): Promise<IConnectorAdapters> {
    const ethAgent = this.getAgent();
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.name);
    }
    await this._forceNetwork(config);
    const accounts: string[] = await ethAgent.request({
      method: "eth_requestAccounts",
    });
    const address = ethers.utils.getAddress(accounts[0]);

    const provider = new ethers.providers.Web3Provider(ethAgent);

    const { chainId } = await provider.getNetwork();
    const chainIdStr = `${chainId}`;

    const adapter = new Web3BaseAdapter(config);

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
      throw new Error("Couldn't connect correctly");
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
        await window.ethereum.request({
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
      throw new Error("Network couldn't be switch correctly.");
    }
  }

  async isAvailable(): Promise<boolean> {
    return (
      !!this.getAgent() &&
      this.getAgent().isMetaMask &&
      !this.getAgent().isMathWallet
    );
  }

  protected getAgent(): any {
    return window.ethereum;
  }

  async initEventController(adapter: IAdapter): Promise<void> {
    this.getAgent().on("accountsChanged", ([address]: string[]) => {
      adapter.setAddress(address);
      this.emitter.emit("AddressChanged", address);
    });

    this.getAgent().on("chainChanged", (chainId: string) => {
      this.emitter.emit("NetworkChanged", hexToDec(chainId));
    });
  }
}
