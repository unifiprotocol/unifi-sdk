import { IOTXNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const IotexConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Iotex,
    chainId: EthChainIds.Iotex,
    publicRpc: "https://babel-api.mainnet.iotex.io",
    nativeToken: IOTXNativeToken,
    multicall: {
      supported: true,
      address: "0xacce294bf7d25fe8c5c64ae45197d3878f68403b",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://iotexscan.io",
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
  [MetamaskConnector, MetamaskCompatibleConnector],
  [
    web3ConnectorFactory(
      OfflineConnectors.Iotex,
      "https://babel-api.mainnet.iotex.io"
    ),
  ]
);
