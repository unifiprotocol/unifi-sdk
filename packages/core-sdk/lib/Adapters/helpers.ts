import { Blockchains, EthChainIds } from "../Types";
import { Opt } from "../Utils/Typings";
import { ExecutionResponse } from "./Types";

export const nonSuccessResponse = (
  value: Partial<ExecutionResponse>
): ExecutionResponse => ({
  success: false,
  value: "",
  hash: "",
  ...value,
});

export const successResponse = (
  value: Partial<ExecutionResponse>
): ExecutionResponse => ({
  success: true,
  value: "",
  hash: "",
  ...value,
});

export const blockchainToEthChainId = (
  blockchain: Blockchains
): Opt<EthChainIds> => {
  const map: Partial<Record<Blockchains, EthChainIds>> = {
    [Blockchains.Binance]: EthChainIds.Bsc,
    [Blockchains.Ethereum]: EthChainIds.Eth,
    [Blockchains.Iotex]: EthChainIds.Iotex,
  };

  return map[blockchain] || undefined;
};
