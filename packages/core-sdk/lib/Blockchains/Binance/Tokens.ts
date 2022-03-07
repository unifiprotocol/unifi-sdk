import { Currency } from "@unifiprotocol/utils";

export const BNBNativeToken = new Currency("BNB", 18, "BNB", "BNB");

export const BNBWrappedToken = new Currency(
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  18,
  "WBNB",
  "Wrapped BNB"
);

export const BNBUpToken = new Currency(
  "0xb4E8D978bFf48c2D8FA241C0F323F71C1457CA81",
  18,
  "UP",
  "UP"
);

export const BNBUnfiToken = new Currency(
  "0x728C5baC3C3e370E372Fc4671f9ef6916b814d8B",
  18,
  "UNFI",
  "UNFI"
);
