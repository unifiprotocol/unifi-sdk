import { BTTCNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const BttcConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.BTTC,
    chainId: EthChainIds.BTTC,
    nativeToken: BTTCNativeToken,
    multicall: {
      supported: false,
      // address: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://scan.bt.io",
      address: function (address: string) {
        return `${this.explorerBaseUrl}/#/address/${address}`;
      },
      token: function (address: string) {
        return `${this.explorerBaseUrl}/#/token20/${address}`;
      },
      tx: function (address: string) {
        return `${this.explorerBaseUrl}/#/transaction/${address}`;
      },
    },
  },
  [MetamaskConnector, MetamaskCompatibleConnector],
  [web3ConnectorFactory(OfflineConnectors.Polygon, "https://rpc.bt.io")]
);
