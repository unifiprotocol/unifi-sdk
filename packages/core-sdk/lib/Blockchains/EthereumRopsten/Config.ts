import { ETHNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const EthereumRopstenConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.EthereumRopsten,
    chainId: EthChainIds.EthRopsten,
    publicRpc: "https://api-ropsten.etherscan.io",
    nativeToken: ETHNativeToken,
    multicall: {
      supported: true,
    },
    explorer: {
      baseUrl: "https://ropsten.etherscan.io",
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
  [
    MetamaskConnector,
    TrustWalletConnector,
    MathWalletConnector,
    MetamaskCompatibleConnector,
  ],
  [
    web3ConnectorFactory(
      OfflineConnectors.EtherScan,
      "https://api-ropsten.etherscan.io"
    ),
  ]
);
