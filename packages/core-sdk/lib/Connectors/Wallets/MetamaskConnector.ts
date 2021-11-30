import { IAdapter } from "../../Types/IAdapter";

import { InvalidNetworkError, WalletNotDetectedError } from "../../Errors";

import { ethers } from "ethers";
import { BaseConnector } from "../BaseConnector";
import { hexToDec } from "@unifiprotocol/utils";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class MetamaskConnector extends BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      {
        name: "Metamask",
        displayName: "Metamask",
        isWallet: true,
      },
      config
    );
  }

  async connect(): Promise<IAdapter> {
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

    const isValidNetwork = await adapter.isValidNetwork(chainIdStr);

    if (!isValidNetwork) {
      throw new InvalidNetworkError(chainIdStr);
    }

    this.initEventController(adapter);

    const address = ethers.utils.getAddress(accounts[0]);

    adapter.setAddress(address);
    adapter.setProvider(provider);

    return adapter;
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
