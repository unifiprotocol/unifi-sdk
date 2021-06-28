import { IAdapter } from "../Adapters";
import { InvalidBlockchainError } from "../Errors";
import { Blockchains } from "../Types";
import { EthMulticallAdapter } from "./Adapters/EthMulticallAdapter";
import { MulticallFallbackAdapter } from "./Adapters/MulticallFallbackAdapter";
import { IMulticallAdapter } from "./IMulticallAdapter";

export const multicallAdapterFactory = (
  adapter: IAdapter
): IMulticallAdapter => {
  const multicallAdapterClass = {
    [Blockchains.Binance]: EthMulticallAdapter,
    [Blockchains.Ethereum]: EthMulticallAdapter,
    [Blockchains.EthereumRopsten]: EthMulticallAdapter,
    [Blockchains.Iotex]: MulticallFallbackAdapter,
    [Blockchains.Tron]: MulticallFallbackAdapter,
  }[adapter.blockchain];

  if (!multicallAdapterClass) {
    throw new InvalidBlockchainError(adapter.blockchain);
  }

  return new multicallAdapterClass(adapter);
};
