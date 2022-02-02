import {
  InvalidNetworkError,
  WalletNotDetectedError,
} from "../../../../Errors";
import { MulticallBaseAdapter } from "../../../../Adapters";
import {
  IConnectorAdapters,
  IBlockchainConfig,
  IAdapter,
  IConnectorMetadata,
  WalletConnectors,
} from "../../../../Types";
import { BaseConnector } from "../../../../Connectors/BaseConnector";
import { RejectedByUser } from "../../../../Errors/RejectedByUser";

import { TronAdapter } from "../../Adapters/TronAdapter";
import { TronChainId } from "../../TronChainIds";

declare global {
  interface Window {
    tronWeb: any;
    tronLink: any;
  }
}

enum TronLinkCodes {
  RejectedByUser = 4001,
  Success = 200,
}
export class TronLinkConnector extends BaseConnector {
  constructor(
    config: IBlockchainConfig,
    metadata: IConnectorMetadata = {
      name: WalletConnectors.TronLink,
      displayName: "TronLink",
      isWallet: true,
    }
  ) {
    super(metadata, config);
  }

  async _connect(): Promise<IConnectorAdapters> {
    const agent = this.getAgent();
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.name);
    }
    const { code } = await agent.request({ method: "tron_requestAccounts" });

    if (code === TronLinkCodes.RejectedByUser) {
      throw new RejectedByUser();
    }
    if (code !== TronLinkCodes.Success) {
      throw new Error("Error connecting");
    }

    const address = await this.getAddress();

    const chainIdStr = TronChainId.Mainnet;

    const adapter = new TronAdapter(this.config);

    adapter.setAddress(address);
    adapter.setProvider(window.tronWeb);

    const multicall = new MulticallBaseAdapter(adapter);
    this.initEventController(adapter);

    const isValidNetwork = await adapter.isValidNetwork(chainIdStr);

    if (!isValidNetwork) {
      throw new InvalidNetworkError(chainIdStr);
    }

    return { adapter, multicall };
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent();
  }

  protected getAgent(): any {
    return window.tronLink;
  }

  protected getAddress(): Promise<string> {
    return new Promise((resolve) => {
      const obj = setInterval(async () => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          resolve(window.tronWeb.defaultAddress.base58);
          clearInterval(obj);
        }
      }, 10);
    });
  }

  async initEventController(adapter: IAdapter): Promise<void> {
    window.addEventListener("message", (event) => {
      if (!event.data?.isTronLink) {
        return;
      }
      const message: { action: string; data: any } = event.data?.message;

      switch (message.action) {
        case "accountsChanged":
          return this.emitter.emit("AddressChanged", message.data.address);
      }
    });
    this.getAgent().on("accountsChanged", ([address]: string[]) => {
      adapter.setAddress(address);
      this.emitter.emit("AddressChanged", address);
    });

    this.getAgent().on("chainChanged", (chainId: string) => {
      // currently we cannot detect network changes as the tron link events does not give chain id information
      this.emitter.emit("NetworkChanged", chainId);
    });
  }
}
