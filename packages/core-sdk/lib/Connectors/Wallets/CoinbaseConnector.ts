import { ethers, utils } from "ethers";
import { BaseConnector } from "../BaseConnector";
import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import Onboard, {
  AppState,
  EIP1193Provider,
  OnboardAPI,
  WalletState,
} from "@web3-onboard/core";
import coinbase from "@web3-onboard/coinbase";
import {
  IConnectorAdapters,
  IBlockchainConfig,
  IConnectorMetadata,
  WalletConnectors,
  IAdapter,
} from "../../Types";
import { Web3MulticallAdapter } from "../../Adapters/Multicall/Web3MulticallAdapter";
import { ForceNetworkError } from "../../Errors/ForceNetworkError";
import { hexToDec } from "@unifiprotocol/utils";

const unfiSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="218" height="84" viewBox="0 0 218 84" fill="none">
    <path d="M46 84.0002H19.2L0.199951 65.0002V38.2002L19.2 19.2002H46L65 38.2002V65.0002L46 84.0002ZM32.5 76.0002H42.5999L57 61.7002V41.5002L42.6999 27.1002H22.5L8.09995 41.5002V61.7002L22.4 76.0002H32.5Z" fill="black"/>
    <path d="M65.1 64.8H38.3L19.3 45.8V19L38.3 0H65.1L84.1001 19V45.8L65.1 64.8ZM51.7 56.8H61.8001L76.1 42.5V22.3L61.8001 7.9H41.6L27.2001 22.2V42.4L41.5 56.7L51.7 56.8Z" fill="#00E676"/>
    <path d="M112.6 32.9076V52.5076C112.493 54.0826 112.954 55.6436 113.9 56.9076C114.403 57.4241 115.013 57.8256 115.686 58.0845C116.359 58.3435 117.08 58.4537 117.8 58.4076C119.057 58.4182 120.296 58.1085 121.4 57.5076C122.575 56.8639 123.653 56.0557 124.6 55.1076V32.8076H132V63.6076H127.5C127.084 63.6339 126.671 63.5202 126.326 63.2847C125.982 63.0491 125.726 62.7052 125.6 62.3076L125.1 59.8076C124.5 60.4076 123.8 61.0076 123.1 61.6076C122.427 62.1351 121.687 62.5722 120.9 62.9076C120.108 63.3109 119.268 63.6133 118.4 63.8076C117.448 64.0167 116.475 64.1174 115.5 64.1076C113.952 64.1388 112.417 63.8317 111 63.2076C109.747 62.6429 108.623 61.8259 107.7 60.8076C106.802 59.7144 106.122 58.4581 105.7 57.1076C105.25 55.581 105.014 53.9991 105 52.4076V32.8076H112.6V32.9076Z" fill="black"/>
    <path d="M139.9 63.7075V32.9075H144.4C144.83 32.8812 145.257 33.0069 145.604 33.2628C145.951 33.5187 146.198 33.8885 146.3 34.3075L146.8 36.7075C147.42 36.0881 148.089 35.5196 148.8 35.0075C149.473 34.48 150.213 34.043 151 33.7075C151.792 33.3042 152.632 33.0019 153.5 32.8075C154.452 32.5984 155.425 32.4978 156.4 32.5075C157.948 32.4763 159.483 32.7835 160.9 33.4075C162.153 33.9722 163.277 34.7892 164.2 35.8075C165.098 36.9008 165.777 38.157 166.2 39.5075C166.698 41.0231 166.935 42.6125 166.9 44.2075V63.8075H159.5V44.2075C159.607 42.6326 159.145 41.0715 158.2 39.8075C157.696 39.291 157.087 38.8895 156.414 38.6306C155.741 38.3717 155.02 38.2615 154.3 38.3075C153.043 38.2969 151.804 38.6066 150.7 39.2075C149.525 39.8513 148.447 40.6594 147.5 41.6075V63.9075H139.9V63.7075Z" fill="black"/>
    <path d="M183 24.0074C183.012 24.6307 182.874 25.2478 182.6 25.8074C182.325 26.3442 181.99 26.8475 181.6 27.3074C181.183 27.7506 180.669 28.0926 180.1 28.3074C179.493 28.5457 178.851 28.6809 178.2 28.7074C176.964 28.6746 175.787 28.1689 174.913 27.2945C174.038 26.4201 173.533 25.2436 173.5 24.0074C173.478 23.3511 173.615 22.6991 173.9 22.1074C174.131 21.5464 174.471 21.0367 174.9 20.6077C175.329 20.1786 175.839 19.8386 176.4 19.6074C176.975 19.3796 177.583 19.2446 178.2 19.2074C178.856 19.1851 179.508 19.3224 180.1 19.6074C180.651 19.8576 181.157 20.1953 181.6 20.6074C182.043 21.0248 182.385 21.5378 182.6 22.1074C182.885 22.6991 183.022 23.3511 183 24.0074V24.0074ZM181.9 32.9074V63.7074H174.5V32.9074H181.9Z" fill="black"/>
    <path d="M191.6 63.7076V38.5076L188.9 38.1076C188.389 38.0314 187.907 37.8247 187.5 37.5076C187.313 37.3515 187.168 37.1501 187.081 36.9226C186.993 36.6951 186.966 36.4489 187 36.2076V33.2076H191.6V32.2076C191.581 30.4339 191.886 28.6716 192.5 27.0076C193.122 25.4236 194.077 23.9915 195.3 22.8076C196.699 21.566 198.33 20.6142 200.1 20.0076C202.291 19.2822 204.592 18.9438 206.9 19.0076C207.768 18.9928 208.636 19.0262 209.5 19.1076C210.277 19.1751 211.046 19.3089 211.8 19.5076L211.6 23.3076C211.6 23.8076 211.3 24.0076 210.8 24.1076C210.238 24.197 209.668 24.2305 209.1 24.2076C207.453 24.1936 205.81 24.3613 204.2 24.7076C203.027 24.9391 201.928 25.4541 201 26.2076C200.204 26.8598 199.614 27.7279 199.3 28.7076C198.917 29.833 198.747 31.02 198.8 32.2076V33.0076H217.9V63.5076H210.5V38.3076H199V63.5076H191.6V63.7076Z" fill="black"/>
</svg>
`;

export class CoinbaseWalletConnector extends BaseConnector {
  static STORAGE_PREFIX = "-walletlink";

  private provider: EIP1193Provider;
  private onboard: OnboardAPI;
  constructor(
    config: IBlockchainConfig,
    metadata: IConnectorMetadata = {
      name: WalletConnectors.WalletConnect,
      displayName: "WalletConnect",
      isWallet: true,
    }
  ) {
    super(metadata, config);
  }

  async _connect(): Promise<IConnectorAdapters> {
    const root = document.documentElement;
    root.style.setProperty("--onboard-modal-z-index", "8000");

    const coinbaseWallet = coinbase();

    this.onboard = Onboard({
      wallets: [coinbaseWallet],
      chains: [
        {
          id: this.config.chainId,
          token: this.config.nativeToken.symbol,
          label: this.config.blockchain,
          rpcUrl: this.config.publicRpc,
        },
      ],
      appMetadata: {
        name: "Unifi Protocol App",
        icon: unfiSvg,
        description: "A set of DeFi products powered by UniFi",
        recommendedInjectedWallets: [
          { name: "MetaMask", url: "https://metamask.io" },
          { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        ],
      },
      accountCenter: {
        desktop: {
          enabled: true,
          position: "bottomRight",
        },
        mobile: {
          enabled: true,
          position: "bottomRight",
        },
      },
    });

    const [{ provider, accounts }] = await this.onboard.connectWallet({
      autoSelect: { label: "Coinbase Wallet", disableModals: true },
    });

    this.provider = provider;

    await this.onboard.setChain({ chainId: this.config.chainId });

    const web3Provider = new ethers.providers.Web3Provider(provider);

    const adapter = new Web3BaseAdapter(this.config);
    adapter.setProvider(web3Provider);
    adapter.setAddress(accounts[0].address);

    this.onboard.state
      .select("wallets")
      .subscribe(this.onWalletsChanged.bind(this));

    const multicall = new Web3MulticallAdapter(adapter);

    this.adapter = { adapter, multicall };

    this.initEventController(adapter);

    return this.adapter;
  }

  async onWalletsChanged(wallets: WalletState[]) {
    if (wallets.length === 0 && this.isConnected()) {
      this.disconnect();
    }
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async disconnect(): Promise<void> {
    super.disconnect();
    const { wallets } = this.onboard.state.get();
    wallets.reduce(async (promise, { label }) => {
      await promise;
      this.onboard.disconnectWallet({ label });
    }, Promise.resolve());
  }

  private async isConnected() {
    return this.adapter !== undefined;
  }

  async initEventController(adapter: IAdapter): Promise<void> {
    this.provider.on("accountsChanged", ([address]: string[]) => {
      adapter.setAddress(address);
      this.emitter.emit("AddressChanged", address);
    });

    this.provider.on("chainChanged", (chainId: string) => {
      this.emitter.emit("NetworkChanged", hexToDec(chainId));
    });

    this.provider.on("disconnect", () => {
      this.emitter.emit("Disconnect");
    });
  }
}
