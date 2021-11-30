import { ETHNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds } from "../../Types/Enums";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { AlchemyConnector } from "../../Connectors/Offline/AlchemyConnector";
import { EtherScanConnector } from "../../Connectors/Offline/EtherScanConnector";
import { blockchainConfigFactory } from "../utils";
import { CloudflareConnector } from "../../Connectors/Offline/CloudflareConnector";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const EthereumConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Ethereum,
    chainId: EthChainIds.Eth,
    nativeToken: ETHNativeToken,
    multicall: {
      supported: true,
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
  },
  [
    MetamaskConnector,
    TrustWalletConnector,
    MathWalletConnector,
    MetamaskCompatibleConnector,
    CloudflareConnector,
    AlchemyConnector,
    EtherScanConnector,
  ]
);