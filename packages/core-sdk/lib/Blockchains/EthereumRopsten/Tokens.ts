import { Currency } from "@unifiprotocol/utils";

export const RopstenNativeToken = new Currency("ETH", 18, "ETH", "Ethereum");

export const RopstenWrappedToken = new Currency(
  "0x81aD5fbAa4ec85Ca6F9C97861522D8491fB4F77F",
  18,
  "WETH",
  "WETH"
);

export const RopstenUpToken = new Currency(
  "0x4393678D5bdD04a6eE5292B5bb1D8e205D9Dc556",
  18,
  "UP",
  "UP"
);
