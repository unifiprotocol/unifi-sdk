import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";
import { unifiBlockchainProxyUrl } from "../../Connectors/Utils";
import { BlockchainScanExplorers } from "@unifiprotocol/utils";
import { ONGNativeToken } from "../OntologyTestnet/NativeToken";

export const OntologyConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Ontology,
    chainId: EthChainIds.Ontology,
    publicRpc: unifiBlockchainProxyUrl(Blockchains.Ontology),
    nativeToken: ONGNativeToken,
    multicall: {
      supported: true,
      address: "0x814D299c9081085C6b99208f1387738EeD3D638F",
      tryAggregate: false,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: (() => {
      const explorer = BlockchainScanExplorers[Blockchains.Ontology];
      return {
        baseUrl: explorer.baseUrl,
        address: explorer.address,
        token: explorer.token,
        tx: explorer.tx,
      };
    })(),
  },
  [MetamaskConnector, MetamaskCompatibleConnector],
  [
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.Ontology,
      unifiBlockchainProxyUrl(Blockchains.Ontology)
    ),
  ]
);
