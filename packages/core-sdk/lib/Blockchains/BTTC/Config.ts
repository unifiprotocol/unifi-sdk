import { BTTCNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";

export const BttcConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.BTTC,
    chainId: EthChainIds.BTTC,
    publicRpc: "https://rpc.bt.io",
    nativeToken: BTTCNativeToken,
    multicall: {
      supported: true,
      address: "0x9F80bb4f2eEEdf82d6Cc39c84184E34FC7F198eE",
      tryAggregate: false,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: "https://scan.bt.io",
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
  [MetamaskConnector, MetamaskCompatibleConnector],
  [
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.BTTC,
      "https://rpc.bt.io"
    ),
  ]
);
