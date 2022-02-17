import { Currency } from "@unifiprotocol/utils";

export const IOTXNativeToken = new Currency("IOTX", 18, "IOTX", "IoTeX");

export const IOTXWrappedToken = new Currency(
  "0xa00744882684c3e4747faefd68d283ea44099d03",
  18,
  "WIOTX",
  "WIOTX"
);

export const IOTXUpToken = new Currency(
  "0x9178f4Ec8a7fF6Fe08E848Eeac3Ddbe1a5fAc70d",
  18,
  "UP",
  "UP"
);
