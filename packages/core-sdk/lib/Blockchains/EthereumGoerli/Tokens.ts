import { Currency } from "@unifiprotocol/utils";

export const GoerliNativeToken = new Currency("ETH", 18, "ETH", "Ethereum");

export const GoerliWrappedToken = new Currency(
  "0xdc2b93f3291030f3f7a6d9363ac37757f7ad5c43",
  18,
  "WETH",
  "Wrapped ETH"
);

export const GoerliUpToken = new Currency(
  "0xfb29Ab63B9a5B49c78F033D5A1174b2CcEB1c9b9",
  18,
  "UP",
  "UP"
);

export const GoerliUnfiToken = new Currency(
  "0xD6d9361cE2fad69164CBE63E6Bd4fe12CfB8c695",
  18,
  "UNFI",
  "UNFI"
);
