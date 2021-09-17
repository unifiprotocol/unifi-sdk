import { toChecksumAddress } from "./utils";

export const TokenLogoResolvers: Record<string, (address: string) => string> = {
  Binance: (hash: string) =>
    `https://icon-service.unifi.report/icon_bsc?token=${toChecksumAddress(
      hash
    )}&autoResolve=false`,
  BinanceTestnet: (hash: string) =>
    `https://icon-service.unifi.report/icon_bsc?token=${toChecksumAddress(
      hash
    )}&autoResolve=false`,
  Polygon: (hash: string) =>
    `https://icon-service.unifi.report/icon_matic?token=${toChecksumAddress(
      hash
    )}&autoResolve=false`,

  Ethereum: (hash: string) =>
    `https://icon-service.unifi.report/icon_eth?token=${toChecksumAddress(
      hash
    )}&autoResolve=false`,
  Ropsten: (hash: string) =>
    `https://icon-service.unifi.report/icon_eth?token=${toChecksumAddress(
      hash
    )}&autoResolve=false`,

  Harmony: (hash: string) =>
    `https://icon-service.unifi.report/icon_one?token=${toChecksumAddress(
      hash
    )}&autoResolve=false`,

  Iotex: (hash: string) =>
    `https://icon-service.unifi.report/icon_iotx?token=${toChecksumAddress(
      hash
    )}&autoResolve=false`,
};
