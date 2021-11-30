import { ETHNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds } from "../../Types/Enums";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { AlchemyConnector } from "../../Connectors/Offline/AlchemyConnector";
import { EtherScanConnector } from "../../Connectors/Offline/EtherScanConnector";
import { addConnectors } from "../utils";
import { CloudflareConnector } from "../../Connectors/Offline/CloudflareConnector";

export const EthereumConfig: IBlockchainConfig = {
  blockchain: Blockchains.Ethereum,
  chainId: EthChainIds.Eth,
  nativeToken: ETHNativeToken,
  multicall: {
    supported: false,
  },
  explorer: {
    baseUrl: "https://etherscan.io",
    address: function (address: string) {
      return `${this.explorerBaseUrl}/address/${address}`;
    },
    token: function (address: string) {
      return `${this.explorerBaseUrl}/token/${address}`;
    },
    tx: function (address: string) {
      return `${this.explorerBaseUrl}/tx/${address}`;
    },
  },
  wallets: [],
  offlineConnectors: [],
};

addConnectors(EthereumConfig, [
  MetamaskConnector,
  MathWalletConnector,
  CloudflareConnector,
  AlchemyConnector,
  EtherScanConnector,
]);
