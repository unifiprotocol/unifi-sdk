import { ONENativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../utils";
import { OneWalletConnector } from "./Wallets/OneWalletConnector";

export const HarmonyConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Harmony,
    chainId: EthChainIds.Harmony,
    nativeToken: ONENativeToken,
    multicall: {
      supported: true,
      address: "0xFE4980f62D708c2A84D3929859Ea226340759320",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://explorer.harmony.one/#",
      address: function (address: string) {
        return `${this.explorerBaseUrl}/address/${address}`;
      },
      token: function (address: string) {
        return `${this.explorerBaseUrl}/tokens/${address}`;
      },
      tx: function (address: string) {
        return `${this.explorerBaseUrl}/tx/${address}`;
      },
    },
  },
  [MetamaskConnector, OneWalletConnector, MathWalletConnector],
  [web3ConnectorFactory(OfflineConnectors.Harmony, "https://api.harmony.one")]
);
