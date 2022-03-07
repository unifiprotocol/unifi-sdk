import {
  BNBNativeToken,
  BNBUpToken,
  BNBWrappedToken,
  BNBUnfiToken,
} from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory } from "../Utils";
import { BinanceChainWalletConnector } from "./Wallets/BinanceChainWalletConnector";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";

export const BinanceConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Binance,
    chainId: EthChainIds.Bsc,
    publicRpc: "https://bsc-dataseed.binance.org/",
    nativeToken: BNBNativeToken,
    wrappedToken: BNBWrappedToken,
    upToken: BNBUpToken,
    unfiToken: BNBUnfiToken,
    multicall: {
      supported: true,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: "https://bscscan.com",
      address: function (address: string) {
        return `${this.baseUrl}/address/${address}`;
      },
      token: function (address: string) {
        return `${this.baseUrl}/token/${address}`;
      },
      tx: function (address: string) {
        return `${this.baseUrl}/tx/${address}`;
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
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.BscDataseed,
      "https://bsc-dataseed.binance.org/"
    ),
  ]
);
