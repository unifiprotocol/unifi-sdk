import { Currency } from "@unifiprotocol/utils";

export const FTMToken = new Currency("FTM", 18, "FTM", "Fantom");

export const FTMWrappedToken = new Currency(
  "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
  18,
  "WFTM",
  "Wrapped FTM"
);

export const FTMUpToken = new Currency(
  "0x172990f96914727e66Be3fC9FE0f4C74FCe06B43",
  18,
  "UP",
  "UP"
);
