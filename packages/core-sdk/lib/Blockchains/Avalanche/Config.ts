import { AVAXNativeToken, AVAXUpToken, AVAXWrappedToken } from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";

export const AvalancheConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Avalanche,
    chainId: EthChainIds.Avalanche,
    publicRpc: "https://api.avax.network/ext/bc/C/rpc",
    nativeToken: AVAXNativeToken,
    wrappedToken: AVAXWrappedToken,
    upToken: AVAXUpToken,
    multicall: {
      supported: true,
      address: "0xa00FB557AA68d2e98A830642DBbFA534E8512E5f",
      tryAggregate: false,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: "https://snowtrace.io",
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
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.Avalanche,
      "https://api.avax.network/ext/bc/C/rpc"
    ),
  ]
);
