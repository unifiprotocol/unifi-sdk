import { toChecksumAddress } from "./utils";

function normalizedToChecksumAddress(hash: string) {
  try {
    const checksum = toChecksumAddress(hash);
    return checksum;
  } catch (err) {
    return hash;
  }
}

export const TokenLogoResolvers: Record<string, (address: string) => string> = {
  Binance: (hash: string) =>
    `https://icon-service.unifi.report/icon_bsc?token=${normalizedToChecksumAddress(
      hash
    )}&autoResolve=false`,
  BinanceTestnet: (hash: string) =>
    `https://icon-service.unifi.report/icon_bsc?token=${normalizedToChecksumAddress(
      hash
    )}&autoResolve=false`,
  Polygon: (hash: string) =>
    `https://icon-service.unifi.report/icon_matic?token=${normalizedToChecksumAddress(
      hash
    )}&autoResolve=false`,

  Ethereum: (hash: string) =>
    `https://icon-service.unifi.report/icon_eth?token=${normalizedToChecksumAddress(
      hash
    )}&autoResolve=false`,
  Ropsten: (hash: string) =>
    `https://icon-service.unifi.report/icon_eth?token=${normalizedToChecksumAddress(
      hash
    )}&autoResolve=false`,

  Harmony: (hash: string) =>
    `https://icon-service.unifi.report/icon_one?token=${normalizedToChecksumAddress(
      hash
    )}&autoResolve=false`,

  Iotex: (hash: string) =>
    `https://icon-service.unifi.report/icon_iotx?token=${normalizedToChecksumAddress(
      hash
    )}&autoResolve=false`,
};
