import {
  Blockchains,
  EthChainIds,
  OfflineConnectors,
  WalletConnectors,
} from "@root/Types";
import { Opt } from "@root/Utils/Typings";

export const isValidConnector = (
  connectorName: WalletConnectors | OfflineConnectors
): boolean => {
  const connectors = [
    ...Object.values(WalletConnectors),
    ...Object.values(OfflineConnectors),
  ];
  return connectors.includes(connectorName);
};

export const isValidBlockchain = (blockchain: Blockchains): boolean => {
  return Object.values(Blockchains).includes(blockchain);
};

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

export const hexToDec = (hex: string): number => parseInt(hex, 16);
