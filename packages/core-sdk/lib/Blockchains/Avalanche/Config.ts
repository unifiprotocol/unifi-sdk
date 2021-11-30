import { AVAXNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds } from "../../Types/Enums";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import { AvalancheConnector } from "./OfflineConnectors/AvalancheConnector";

export const AvalancheConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Avalanche,
    chainId: EthChainIds.Avalanche,
    nativeToken: AVAXNativeToken,
    multicall: {
      supported: true,
      address: "0xa00FB557AA68d2e98A830642DBbFA534E8512E5f",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://snowtrace.io",
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
  [MetamaskConnector, MetamaskCompatibleConnector, AvalancheConnector]
);
