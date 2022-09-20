import {
  AVAXNativeToken,
  AVAXUpToken,
  AVAXWrappedToken,
  AVAXUnfiToken,
} from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";
import { WalletConnectConnector } from "../../Connectors/Wallets/WalletConnectConnector";
import { CoinbaseWalletConnector } from "../../Connectors/Wallets/CoinbaseConnector";
import { TokenPocketConnector } from "../../Connectors/Wallets/TokenPocketConnector";

export const AvalancheConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Avalanche,
    chainId: EthChainIds.Avalanche,
    publicRpc: "https://api.avax.network/ext/bc/C/rpc",
    nativeToken: AVAXNativeToken,
    wrappedToken: AVAXWrappedToken,
    upToken: AVAXUpToken,
    unfiToken: AVAXUnfiToken,
    logoURI:
      "https://proxy.unifiprotocol.com/ipfs/QmWPVF97Jrf4QZZwsfgbViZRYFCqg8jyU3gH72QwLPTF64",
    multicall: {
      supported: true,
      address: "0xa00FB557AA68d2e98A830642DBbFA534E8512E5f",
      tryAggregate: false,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: "https://snowtrace.io",
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
    TokenPocketConnector,
    MetamaskCompatibleConnector,
    CoinbaseWalletConnector,
    WalletConnectConnector,
  ],
  [
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.Avalanche,
      "https://api.avax.network/ext/bc/C/rpc"
    ),
  ]
);
