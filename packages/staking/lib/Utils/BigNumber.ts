import BNjs from "bignumber.js";

export const BigNumber = (arg: BNjs.Value, base?: number) =>
  new BNjs(arg, base);

export const BN = BigNumber;

export const isNumber = (num: string | number) => !BigNumber(num).isNaN();

export const isNumberAndNonZero = (n: string | number) => {
  const num = BigNumber(n);
  return !num.isNaN() && !num.isZero();
};

export const areNumbers = (numbers: Array<string | number>) =>
  numbers.every(isNumber);

export const localiseNumber = (num: string | number) =>
  BigNumber(num).toNumber().toLocaleString("en-US");

export const truncate = (num: string | number) =>
  Math.trunc(BigNumber(num).toNumber()).toString(10);

export const toNumber = (num: string | number) => BigNumber(num).toNumber();

export const toBNFixed = (num: string | number) => BigNumber(num).toFixed();

export const toHex = (num: string | number) =>
  "0x" + BigNumber(num).toString(16);

export const hexToDec = (hex: string) => parseInt(hex, 16);

export const truncateDecimals = (num: string | number, decimalPlaces = 18) => {
  if (typeof num === "string" && /\.(0{0,})?$/.test(num)) return num;
  return BigNumber(num).decimalPlaces(decimalPlaces).toFixed();
};

export const isNaN = (num: string) => {
  return BigNumber(num).isNaN();
};

export const MAX_UINT256 = BN(2 ** 256).toFixed();

export const ifNanThen = (num: string, defValue: string) => {
  if (isNaN(defValue)) {
    throw new Error("Ensure defValue is a Number");
  }
  return isNaN(num) ? defValue : num;
};

export const bnMax = (...nums: Array<BNjs | string | number>) => {
  return BNjs.maximum(...nums);
};
export const bnMin = (...nums: Array<BNjs | string | number>) => {
  return BNjs.minimum(...nums);
};
