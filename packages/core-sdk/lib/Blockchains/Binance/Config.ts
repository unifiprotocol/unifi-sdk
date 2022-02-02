import { BNBNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { BinanceChainWalletConnector } from "./Wallets/BinanceChainWalletConnector";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const BinanceConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Binance,
    chainId: EthChainIds.Bsc,
    publicRpc: "https://bsc-dataseed.binance.org/",
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
  ],
  [
    web3ConnectorFactory(
      OfflineConnectors.BscDataseed,
      "https://bsc-dataseed.binance.org/"
    ),
  ]
);
