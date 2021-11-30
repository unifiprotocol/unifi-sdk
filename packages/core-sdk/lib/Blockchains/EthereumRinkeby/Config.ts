import { ETHNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds } from "../../Types/Enums";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { AlchemyConnector } from "../../Connectors/Offline/AlchemyConnector";
import { EtherScanConnector } from "../../Connectors/Offline/EtherScanConnector";
import { blockchainConfigFactory } from "../utils";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const EthereumRinkebyConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.EthereumRinkeby,
    chainId: EthChainIds.EthRinkeby,
    nativeToken: ETHNativeToken,
    multicall: {
      supported: true,
    },
    explorer: {
      baseUrl: "https://rinkeby.etherscan.io",
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
    EtherScanConnector,
  ]
);
