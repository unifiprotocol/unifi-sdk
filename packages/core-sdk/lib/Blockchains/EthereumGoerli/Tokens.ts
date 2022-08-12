import { Currency } from "@unifiprotocol/utils";

export const GoerliNativeToken = new Currency("ETH", 18, "ETH", "Ethereum");

export const GoerliWrappedToken = new Currency(
  "0xdc2b93f3291030f3f7a6d9363ac37757f7ad5c43",
  18,
  "WETH",
  "Wrapped ETH"
);

export const GoerliUpToken = new Currency(
  "0x2A32f19ca22EE817040A3914bD3C4EB02588F928",
  18,
  "UP",
  "UP"
);
