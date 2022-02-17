import { MATICNativeToken, MATICUpToken, MATICWrappedToken } from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const PolygonConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Polygon,
    chainId: EthChainIds.Polygon,
    publicRpc: "https://polygon-rpc.com",
    nativeToken: MATICNativeToken,
    wrappedToken: MATICWrappedToken,
    upToken: MATICUpToken,
    multicall: {
      supported: true,
      address: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://polygonscan.com",
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
  [web3ConnectorFactory(OfflineConnectors.Polygon, "https://polygon-rpc.com")]
);
