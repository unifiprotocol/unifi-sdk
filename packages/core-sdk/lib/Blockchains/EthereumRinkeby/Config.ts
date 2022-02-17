import { RinkebyNativeToken, RinkebyWrappedToken } from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const EthereumRinkebyConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.EthereumRinkeby,
    chainId: EthChainIds.EthRinkeby,
    publicRpc: "https://api-rinkeby.etherscan.io",
    nativeToken: RinkebyNativeToken,
    wrappedToken: RinkebyWrappedToken,
    multicall: {
      supported: true,
    },
    explorer: {
      baseUrl: "https://rinkeby.etherscan.io",
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
  [
    MetamaskConnector,
    TrustWalletConnector,
    MathWalletConnector,
    MetamaskCompatibleConnector,
  ],
  [
    web3ConnectorFactory(
      OfflineConnectors.EtherScan,
      "https://api-rinkeby.etherscan.io"
    ),
  ]
);
