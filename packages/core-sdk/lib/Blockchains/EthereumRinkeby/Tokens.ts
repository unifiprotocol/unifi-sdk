import { Currency } from "@unifiprotocol/utils";

export const RinkebyNativeToken = new Currency("ETH", 18, "ETH", "Ethereum");

export const RinkebyWrappedToken = new Currency(
  "0xdf032bc4b9dc2782bb09352007d4c57b75160b15",
  18,
  "WETH",
  "Wrapped ETH"
);
