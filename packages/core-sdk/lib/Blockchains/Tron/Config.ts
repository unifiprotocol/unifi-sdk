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
      supported: false,
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
        return `${this.baseUrl}/transaction/${address}`;
      },
    },
  },
  [TronLinkConnector],
  [tronConnectorFactory(OfflineConnectors.TronGrid, "https://api.trongrid.io")]
);
