import { ETHNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { AlchemyConnector } from "../../Connectors/Offline/AlchemyConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../Utils";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const EthereumConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Ethereum,
    chainId: EthChainIds.Eth,
    publicRpc: "https://cloudflare-eth.com/",
    nativeToken: ETHNativeToken,
    multicall: {
      supported: true,
    },
    explorer: {
      baseUrl: "https://etherscan.io",
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
    AlchemyConnector,
  ],
  [
    web3ConnectorFactory(
      OfflineConnectors.EtherScan,
      "https://api.etherscan.io"
    ),
    web3ConnectorFactory(
      OfflineConnectors.Cloudflare,
      "https://cloudflare-eth.com/"
    ),
  ]
);
