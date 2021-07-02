import { IAdapter } from "../../../Adapters";
import { WalletConnector } from "../..//Wallet/WalletConnector";
import { InvalidNetworkError, WalletNotDetectedError } from "../../../Errors";
import { hexToDec } from "../../../Utils/BigNumber";
import { ethers } from "ethers";
import { Blockchains } from "../../../Types";
import { metamaskWalletMetadata } from "./MetamaskMetadata";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class MetamaskConnector extends WalletConnector {
  constructor(
    protected adapter: IAdapter,
    protected blockchain: Blockchains,
    connectorMetadata = metamaskWalletMetadata
  ) {
    super(adapter, blockchain, connectorMetadata);
  }
  async connect(): Promise<IAdapter> {
    const ethAgent = this.getAgent();
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.displayName);
    }
    const accounts: string[] = await ethAgent.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethAgent);

    this.initEventController();

    const { chainId } = await provider.getNetwork();
    const chainIdStr = `${chainId}`;
    const isValidNetwork = await this.adapter.isValidNetwork(chainIdStr);

    if (!isValidNetwork) {
      throw new InvalidNetworkError(chainIdStr);
    }

    const address = ethers.utils.getAddress(accounts[0]);

    this.adapter.setAddress(address);
    this.adapter.setProvider(provider);

    return this.adapter;
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

  async initEventController(): Promise<void> {
    this.getAgent().on("accountsChanged", ([address]: string[]) => {
      this.adapter.setAddress(address);
      this.emitter.emit("AddressChanged", address);
    });

    this.getAgent().on("chainChanged", (chainId: string) => {
      this.emitter.emit("NetworkChanged", hexToDec(chainId));
    });
  }
}
