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
      supported: true,
      address: "0x9F80bb4f2eEEdf82d6Cc39c84184E34FC7F198eE",
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
  [web3ConnectorFactory(OfflineConnectors.BTTC, "https://rpc.bt.io")]
);
