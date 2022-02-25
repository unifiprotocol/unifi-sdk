import { ONGNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";
import { unifiBlockchainProxyUrl } from "../../Connectors/Utils";

export const OntologyTestnetConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.OntologyTestnet,
    chainId: EthChainIds.OntologyTestnet,
    publicRpc: unifiBlockchainProxyUrl(Blockchains.OntologyTestnet),
    nativeToken: ONGNativeToken,
    multicall: {
      supported: true,
      address: "0x814D299c9081085C6b99208f1387738EeD3D638F",
      tryAggregate: false,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: `https://explorer.ont.io/testnet`,
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
      OfflineConnectors.OntologyTestnet,
      unifiBlockchainProxyUrl(Blockchains.OntologyTestnet)
    ),
  ]
);
