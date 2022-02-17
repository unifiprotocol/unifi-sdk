import { Currency } from "@unifiprotocol/utils";

export const BNBNativeToken = new Currency("BNB", 18, "BNB", "BNB");

export const BNBWrappedToken = new Currency(
  "0xC578c6e2505Fd2B227A64350ABf85e7221D17c91",
  18,
  "WBNB",
  "Wrapped BNB"
);

export const BNBUpToken = new Currency(
  "0x2E37B22aEAAc7767998891E076AB56a6a8b8bbBF",
  18,
  "UP",
  "UP"
);
