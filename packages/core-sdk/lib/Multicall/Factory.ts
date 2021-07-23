import { IAdapter } from "../Adapters";
import { InvalidBlockchainError } from "../Errors";
import { Blockchains } from "../Types";
import { EthMulticallAdapter } from "./Adapters/EthMulticallAdapter";
import { HarmonyMulticallAdapter } from "./Adapters/HarmonyMulticallAdapter";
import { IotexMulticallAdapter } from "./Adapters/IotexMulticallAdapter";
import { MulticallFallbackAdapter } from "./Adapters/MulticallFallbackAdapter";
import { PolygonMulticallAdapter } from "./Adapters/PolygonMulticallAdapter";
import { IMulticallAdapter } from "./IMulticallAdapter";

export const multicallAdapterFactory = (
  adapter: IAdapter
): IMulticallAdapter => {
  const multicallAdapterClass = {
    [Blockchains.Binance]: EthMulticallAdapter,
    [Blockchains.Ethereum]: EthMulticallAdapter,
    [Blockchains.EthereumRopsten]: EthMulticallAdapter,
    [Blockchains.Iotex]: IotexMulticallAdapter,
    [Blockchains.Tron]: MulticallFallbackAdapter,
    [Blockchains.Harmony]: HarmonyMulticallAdapter,
    [Blockchains.Polygon]: PolygonMulticallAdapter,
  }[adapter.blockchain];

  if (!multicallAdapterClass) {
    throw new InvalidBlockchainError(adapter.blockchain);
  }

  return new multicallAdapterClass(adapter);
};
