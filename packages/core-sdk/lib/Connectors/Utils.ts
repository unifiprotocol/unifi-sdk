import { Blockchains } from "../Types";

export const unifiBlockchainProxyUrl = (blockchain: Blockchains) => {
  return `https://proxy.unifiprotocol.app/${blockchain}`;
};
