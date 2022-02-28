import { Blockchains } from "../Types";

export const unifiBlockchainProxyUrl = (blockchain: Blockchains): string => {
  return `https://proxy.unifiprotocol.com/rpc/${blockchain}`;
};
