import { InvalidNetworkError, WalletNotDetectedError } from "../../Errors";
import { ethers } from "ethers";
import { BaseConnector } from "../BaseConnector";
import { hexToDec } from "@unifiprotocol/utils";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";

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
    this.initEventController(adapter);

    const isValidNetwork = await adapter.isValidNetwork(chainIdStr);

    if (!isValidNetwork) {
      throw new InvalidNetworkError(chainIdStr);
    }

    const address = ethers.utils.getAddress(accounts[0]);

    adapter.setAddress(address);
    adapter.setProvider(provider);

    const multicall = new Web3MulticallAdapter(adapter);
    return { adapter, multicall };
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
