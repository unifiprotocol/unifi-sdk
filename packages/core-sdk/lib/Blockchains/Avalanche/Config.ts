import { AVAXNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const AvalancheConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Avalanche,
    chainId: EthChainIds.Avalanche,
    publicRpc: "https://api.avax.network/ext/bc/C/rpc",
    nativeToken: AVAXNativeToken,
    multicall: {
      supported: true,
      address: "0xa00FB557AA68d2e98A830642DBbFA534E8512E5f",
      tryAggregate: false,
    },
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
    web3ConnectorFactory(
      OfflineConnectors.Avalanche,
      "https://api.avax.network/ext/bc/C/rpc"
    ),
  ]
);
