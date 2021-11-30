import { IOTXNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds } from "../../Types/Enums";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import { IotexConnector } from "./OfflineConnectors/IotexConnector";

export const IotexConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Iotex,
    chainId: EthChainIds.Iotex,
    nativeToken: IOTXNativeToken,
    multicall: {
      supported: true,
      address: "0xacce294bf7d25fe8c5c64ae45197d3878f68403b",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://iotexscan.io",
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
  [MetamaskConnector, MetamaskCompatibleConnector, IotexConnector]
);