import { IAdapter } from "../../Types/IAdapter";

import { InvalidNetworkError, WalletNotDetectedError } from "../../Errors";

import { ethers } from "ethers";
import { BaseConnector } from "../BaseConnector";
import { hexToDec } from "@unifiprotocol/utils";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";
import { Blockchains, IConnectorAdapters, WalletConnectors } from "../../Types";
import { Web3MulticallAdapter } from "../../Adapters";

declare global {
  interface Window {
    ethereum: any;
    harmony: any;
  }
}

export class MathWalletConnector extends BaseConnector {
  constructor(blockchainConfig: IBlockchainConfig) {
    super(
      {
        name: WalletConnectors.MathWallet,
        displayName: WalletConnectors.MathWallet,
        isWallet: true,
      },
      blockchainConfig
    );
  }

  async connect(): Promise<IConnectorAdapters> {
    const ethAgent = this.getAgent();
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.name);
    }
    const accounts: string[] = await ethAgent.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethAgent);

    const { chainId } = await provider.getNetwork();
    const chainIdStr = `${chainId}`;

    const adapter = new Web3BaseAdapter(this.config);
    const multicall = new Web3MulticallAdapter(adapter);

    const isValidNetwork = await adapter.isValidNetwork(chainIdStr);

    if (!isValidNetwork) {
      throw new InvalidNetworkError(chainIdStr);
    }

    this.initEventController(adapter);

    const address = ethers.utils.getAddress(accounts[0]);

    adapter.setAddress(address);
    adapter.setProvider(provider);

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
