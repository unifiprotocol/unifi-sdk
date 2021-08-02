import { IAdapter } from "../../../Adapters";
import { IconexAdapter } from "../../../Adapters/Icon/IconexAdapter";
import { WalletNotDetectedError } from "../../../Errors";
import { Blockchains } from "../../../Types";
import { BaseConnector } from "../../BaseConnector";
import { iconexWalletMetadata } from "./IconexWalletMetadata";
import { IconexWalletApi } from "./IconexWalletApi";

const setAddrCache = (address: string) =>
  localStorage.setItem("core-sdk-iconex-address", address);
const getAddrCache = () =>
  localStorage.getItem("core-sdk-iconex-address") || undefined;

export class IconexWalletConnector extends BaseConnector {
  protected adapter: IconexAdapter;
  private agent = new IconexWalletApi();
  constructor(protected blockchain: Blockchains) {
    super(blockchain, iconexWalletMetadata);
    this.adapter = new IconexAdapter();
  }
  private async getAddress(iconexApi: IconexWalletApi) {
    const cachedAddress = getAddrCache();
    if (cachedAddress) {
      const cachedAddressExists = await iconexApi.hasAddress(cachedAddress);
      if (cachedAddressExists) {
        return cachedAddress;
      }
      setAddrCache(undefined);
    }
    return iconexApi.getAccount();
  }
  async connect(): Promise<IAdapter> {
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.displayName);
    }

    const iconexApi = new IconexWalletApi();
    const address = await this.getAddress(iconexApi);

    if (!address) {
      throw new WalletNotDetectedError(this.metadata.displayName);
    }

    setAddrCache(address);
    this.adapter.setProvider(this.getAgent());
    this.adapter.setAddress(address);
    return this.adapter;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().hasAccount();
  }

  protected getAgent(): IconexWalletApi {
    return this.agent;
  }

  async initEventController(): Promise<void> {
    // no events
  }
  async disconnect(): Promise<void> {
    super.disconnect();
    setAddrCache(undefined);
  }
}
