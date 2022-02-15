import { TronNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { blockchainConfigFactory } from "../Utils";
import { TronLinkConnector } from "./Connectors/Wallets/TronLinkConnector";
import { tronConnectorFactory } from "./Connectors/Utils";
import { AxiosConcurrencyHandler } from "../../Utils/AxiosRateLimiter";

const tronGridApiKey = "a2a267ee-3e71-430c-b51a-342aabd68deb";
// share rate limiter across all offline connectors to limit requests globally
const tronGridRateLimiter = new AxiosConcurrencyHandler(10, 1000);

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
      headers: { "TRON-PRO-API-KEY": tronGridApiKey },
      rateLimiter: tronGridRateLimiter,
    }),
  ]
);
