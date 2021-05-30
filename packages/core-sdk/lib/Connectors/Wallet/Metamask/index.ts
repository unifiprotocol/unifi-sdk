import { IAdapter } from "@root/Adapters/IAdapter";
import { WalletConnector } from "@root/Connectors/Wallet/WalletConnector";
import { InvalidNetworkError } from "@root/Errors/InvalidNetworkError";
import { WalletNotDetectedError } from "@root/Errors/WalletNotDetectedError";
import { hexToDec } from "@root/helpers";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class MetamaskConnector extends WalletConnector {
  async connect(): Promise<IAdapter> {
    const ethAgent = this.getAgent();
    if (!ethAgent) {
      throw new WalletNotDetectedError("Metamask");
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

  async initEventController() {
    this.getAgent().on("accountsChanged", ([address]: string[]) => {
      this.adapter.setAddress(address);
      this.emitter.emit("AddressChanged", address);
    });

    this.getAgent().on("chainChanged", (chainId: string) => {
      this.emitter.emit("NetworkChanged", hexToDec(chainId));
    });
  }
}
