import { TronNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { blockchainConfigFactory } from "../Utils";
import { TronLinkConnector } from "./Connectors/Wallets/TronLinkConnector";
import {
  tronConnectorFactory,
  createTronOfflineConnectorHelper,
} from "./Connectors/Factory";

const tronGridApiKey = "a2a267ee-3e71-430c-b51a-342aabd68deb";

export const TronConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Tron,
    chainId: EthChainIds.Na,
    publicRpc: "https://api.trongrid.io",
    nativeToken: TronNativeToken,
    connectorFactory: tronConnectorFactory,
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
    createTronOfflineConnectorHelper(OfflineConnectors.TronGrid, {
      fullHost: "https://api.trongrid.io",
      headers: { "TRON-PRO-API-KEY": tronGridApiKey },
    }),
    createTronOfflineConnectorHelper(OfflineConnectors.UnifiProxy, {
      fullHost: `https://proxy.unifiprotocol.com/${Blockchains.Tron}`,
    }),
  ]
);
