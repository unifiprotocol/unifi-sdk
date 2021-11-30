import { MATICNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds } from "../../Types/Enums";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import { PolygonConnector } from "./OfflineConnectors/PolygonConnector";

export const PolygonConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Polygon,
    chainId: EthChainIds.Polygon,
    nativeToken: MATICNativeToken,
    multicall: {
      supported: true,
      address: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://polygonscan.com",
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
  [MetamaskConnector, MetamaskCompatibleConnector, PolygonConnector]
);
