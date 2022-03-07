import { Currency } from "@unifiprotocol/utils";

export const AVAXNativeToken = new Currency("AVAX", 18, "AVAX", "AVAX");

export const AVAXWrappedToken = new Currency(
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  18,
  "WAVAX",
  "Wrapped AVAX"
);
export const AVAXUpToken = new Currency(
  "0x172990f96914727e66Be3fC9FE0f4C74FCe06B43",
  18,
  "UP",
  "UP"
);
