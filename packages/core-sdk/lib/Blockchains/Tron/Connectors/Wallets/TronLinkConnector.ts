import { Blockchains } from "@unifiprotocol/utils";

import {
  InvalidNetworkError,
  WalletNotDetectedError,
  WalletIsLockedError,
} from "../../../../Errors";
import { MulticallBaseAdapter } from "../../../../Adapters";
import {
  IConnectorAdapters,
  IBlockchainConfig,
  IAdapter,
  WalletConnectors,
} from "../../../../Types";
import { BaseConnector } from "../../../../Connectors/BaseConnector";
import { RejectedByUser } from "../../../../Errors/RejectedByUser";

import { TronAdapter } from "../../Adapters/TronAdapter";
import { TronChainId } from "../../TronChainIds";
import TronWeb from "tronweb";
import { unifiBlockchainProxyUrl } from "../../../../Connectors/Utils";

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
  constructor(config: IBlockchainConfig) {
    super(
      {
        name: WalletConnectors.TronLink,
        displayName: "TronLink",
        isWallet: true,
      },
      config
    );
  }

  protected async _forceNetwork(): Promise<void> {}

  async _connect(): Promise<IConnectorAdapters> {
    const agent = this.getAgent();
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.name);
    }
    const { code } = await agent.request({ method: "tron_requestAccounts" });

    if (!code) {
      throw new WalletIsLockedError(this.metadata.name);
    }

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

    this.overrideTronLinkJsonNode(adapter.getProvider());

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
    const emitter = this.emitter;

    window.addEventListener("message", (event) => {
      if (!event.data?.isTronLink) {
        return;
      }
      const message: { action: string; data: any } = event.data?.message;

      switch (message.action) {
        case "accountsChanged":
          return emitter.emit("AddressChanged", message.data.address);
      }
    });
  }

  private overrideTronLinkJsonNode(tronweb: TronWeb): void {
    [
      tronweb.fullNode.instance,
      tronweb.eventServer.instance,
      tronweb.solidityNode.instance,
    ].forEach((axiosInstance) => {
      axiosInstance.interceptors.request.use((config: any) => {
        config.baseURL = unifiBlockchainProxyUrl(Blockchains.Tron);
        return Promise.resolve(config);
      });
    });
  }
}
