import { BNBNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds } from "../../Types/Enums";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory } from "../utils";
import { BinanceChainWalletConnector } from "./Wallets/BinanceChainWalletConnector";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import { BscDataSeedConnector } from "./OfflineConnectors/BscDataSeedConnector";

export const BinanceConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Binance,
    chainId: EthChainIds.Bsc,
    nativeToken: BNBNativeToken,
    multicall: {
      supported: true,
    },
    explorer: {
      baseUrl: "https://bscscan.com",
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
    BscDataSeedConnector,
  ]
);
