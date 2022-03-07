import { Currency } from "@unifiprotocol/utils";

export const MATICNativeToken = new Currency("MATIC", 18, "MATIC", "MATIC");

export const MATICWrappedToken = new Currency(
  "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  18,
  "WMATIC",
  "WMATIC"
);

export const MATICUpToken = new Currency(
  "0x49b4d34edcc985fea2a8fbcc11ec575283d10d87",
  18,
  "UP",
  "UP"
);
