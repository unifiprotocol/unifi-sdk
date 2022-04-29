import { TronNativeToken } from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { blockchainConfigFactory } from "../Utils";
import { TronLinkConnector } from "./Connectors/Wallets/TronLinkConnector";
import {
  tronConnectorFactory,
  createTronOfflineConnectorHelper,
} from "./Connectors/Factory";
import { unifiBlockchainProxyUrl } from "../../Connectors/Utils";
import { TronUpToken, TronWrappedToken } from ".";

const tronGridApiKey = "a2a267ee-3e71-430c-b51a-342aabd68deb";

export const TronConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Tron,
    chainId: EthChainIds.Tron,
    publicRpc: "https://api.trongrid.io",
    nativeToken: TronNativeToken,
    wrappedToken: TronWrappedToken,
    upToken: TronUpToken,
    logoURI:
      "https://proxy.unifiprotocol.com/ipfs/QmNfhQcEHNL7tJJHCitHEwKFEr37dLJPVWaWZ13yXbYUZ8",
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
      fullHost: unifiBlockchainProxyUrl(Blockchains.Tron),
    }),
  ]
);
