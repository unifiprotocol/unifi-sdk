import { Blockchains, EthChainIds } from "../../Types/Enums";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { AlchemyConnector } from "../../Connectors/Offline/AlchemyConnector";
import { EtherScanConnector } from "../../Connectors/Offline/EtherScanConnector";
import { blockchainConfigFactory } from "../utils";
import { CloudflareConnector } from "../../Connectors/Offline/CloudflareConnector";
import { BinanceChainWalletConnector } from "../Binance/Wallets/BinanceChainWalletConnector";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import { BNBNativeToken } from "../Binance/NativeToken";
import { BscTesnetDataSeedConnector } from "./OfflineConnectors/BscDataSeedConnector";

export const BinanceTesnetConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.BinanceTestnet,
    chainId: EthChainIds.BscTestnet,
    nativeToken: BNBNativeToken,
    multicall: {
      supported: true,
    },
    explorer: {
      baseUrl: "https://testnet.bscscan.com",
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
    BinanceChainWalletConnector,
    TrustWalletConnector,
    MathWalletConnector,
    MetamaskCompatibleConnector,
    BscTesnetDataSeedConnector,
  ]
);
