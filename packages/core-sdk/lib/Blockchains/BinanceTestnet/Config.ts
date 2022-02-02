import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { BinanceChainWalletConnector } from "../Binance/Wallets/BinanceChainWalletConnector";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import { BNBNativeToken } from "../Binance/NativeToken";

export const BinanceTesnetConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.BinanceTestnet,
    chainId: EthChainIds.BscTestnet,
    publicRpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    nativeToken: BNBNativeToken,
    multicall: {
      supported: true,
      address: "0xae11c5b5f29a6a25e955f0cb8ddcc416f522af5c",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://testnet.bscscan.com",
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
    web3ConnectorFactory(
      OfflineConnectors.BscDataseed,
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    ),
  ]
);
