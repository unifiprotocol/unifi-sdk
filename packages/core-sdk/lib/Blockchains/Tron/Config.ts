import { TronNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, IBlockchainConfig } from "../../Types";
import { blockchainConfigFactory } from "../Utils";
import { TronLinkConnector } from "./Connectors/Wallets/TronLinkConnector";
import { TronGridConnector } from "./Connectors/Offline/TronGridConnector";

export const TronConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Tron,
    chainId: EthChainIds.Na,
    publicRpc: "https://api.trongrid.io",
    nativeToken: TronNativeToken,
    multicall: {
      supported: false,
    },
    explorer: {
      baseUrl: "https://tronscan.org",
      address: function (address: string) {
        return `${this.baseUrl}/#/address/${address}`;
      },
      token: function (address: string) {
        return `${this.baseUrl}/#/token20/${address}`;
      },
      tx: function (address: string) {
        return `${this.baseUrl}/transaction/${address}`;
      },
    },
  },
  [TronLinkConnector],
  [(config: IBlockchainConfig) => new TronGridConnector(config)]
);
