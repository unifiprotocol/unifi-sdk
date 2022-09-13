import { BTTCNativeToken, BTTCUpToken, BTTCWrappedToken } from "./Tokens";
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

export const BttcConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.BTTC,
    chainId: EthChainIds.BTTC,
    publicRpc: "https://rpc.bt.io",
    nativeToken: BTTCNativeToken,
    wrappedToken: BTTCWrappedToken,
    upToken: BTTCUpToken,
    logoURI:
      "https://proxy.unifiprotocol.com/ipfs/QmTrdCwZBPhGSjjFHrZwVBGcSKM2tgdQMiAWuePwhMMR9q",
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
  [
    MetamaskConnector,
    MetamaskCompatibleConnector,
    CoinbaseWalletConnector,
    WalletConnectConnector,
  ],
  [
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.BTTC,
      "https://rpc.bt.io"
    ),
  ]
);
