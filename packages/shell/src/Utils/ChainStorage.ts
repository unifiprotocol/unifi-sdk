import { Blockchains } from "@unifiprotocol/core-sdk";

const KEY_PREFIX = "app";

export const setChainOnStorage = (chain: Blockchains) =>
  localStorage.setItem(`${KEY_PREFIX}.blockchain`, chain);

export const getChainOnStorage = () =>
  localStorage.getItem(`${KEY_PREFIX}.blockchain`) as Blockchains | null;

type StorageKey = "CONNECTOR";

export const setStorageKey = (
  blockchain: Blockchains,
  keyName: StorageKey,
  keyValue: string
) => localStorage.setItem(`${KEY_PREFIX}.${blockchain}.${keyName}`, keyValue);

export const getStorageKey = (blockchain: Blockchains, keyName: StorageKey) =>
  localStorage.getItem(`${KEY_PREFIX}.${blockchain}.${keyName}`);
