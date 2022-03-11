import { ONGNativeToken, ONGUpToken, ONGWrappedToken } from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";
import { unifiBlockchainProxyUrl } from "../../Connectors/Utils";

export const OntologyConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Ontology,
    chainId: EthChainIds.Ontology,
    publicRpc: unifiBlockchainProxyUrl(Blockchains.Ontology),
    nativeToken: ONGNativeToken,
    wrappedToken: ONGWrappedToken,
    upToken: ONGUpToken,
    multicall: {
      supported: true,
      address: "0xF0FccF333d45B383A9086739Ab8176BeDDd5a519",
      tryAggregate: false,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: `https://explorer.ont.io`,
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
      OfflineConnectors.UnifiProxy,
      unifiBlockchainProxyUrl(Blockchains.Ontology)
    ),
  ]
);