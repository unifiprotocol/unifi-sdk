import { TronNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { blockchainConfigFactory } from "../Utils";
import { TronLinkConnector } from "./Connectors/Wallets/TronLinkConnector";
import { tronConnectorFactory } from "./Connectors/Utils";

export const TronConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Tron,
    chainId: EthChainIds.Na,
    publicRpc: "https://api.trongrid.io",
    nativeToken: TronNativeToken,
    multicall: {
      supported: true,
    },
    explorer: {
      baseUrl: "https://tronscan.org",
      address: function (address: string) {
        return `${this.baseUrl}/#/address/${address}`;
      },
      token: function (address: string) {
        return `${this.baseUrl}/#/token20/${address}`;
      },
      tx: function (address: string) {
        return `${this.baseUrl}/#/transaction/${address}`;
      },
    },
  },
  [TronLinkConnector],
  [
    tronConnectorFactory(OfflineConnectors.TronGrid, {
      fullHost: "https://api.trongrid.io",
      //"http://104.248.61.75:8090",
      headers: { "TRON-PRO-API-KEY": "affc4df2-9d03-49a8-8397-a2928977f1fe" },
      apiKey: "affc4df2-9d03-49a8-8397-a2928977f1fe",
    }),
  ]
);
