import { IBlock, ITransactionReceipt, TransactionStatus } from "../../../Types";
import * as TronAddressFormat from "tron-format-address";
import { TronNativeToken } from "../Tokens";
import { ERC20ABI } from "../../..";

export function removeNumericKeys(
  obj: Record<string, any>
): Record<string, any> {
  const argKeys = Object.keys(obj).filter((key) => isNaN(Number(key)));
  const args: Record<string, any> = {};
  argKeys.forEach((key) => {
    args[key] = obj[key];
  });
  return args;
}
// todo move to ResponseNormalizer file
export function mapTrxBlockToGlobalInterface(block: any): IBlock {
  const hash = block.blockID;
  const parentHash = block.block_header.raw_data.parentHash;
  const number = block.block_header.raw_data.number;
  const timestamp = Math.floor(
    Number(block.block_header.raw_data.timestamp / 1000)
  );

  return {
    hash,
    parentHash,
    number,
    timestamp,
    transactions: (block.transactions || []).map((tx: any) => tx.txID),
  };
}

export function mapTronTxToGlobal(
  block: { number: number; timestamp: number },
  tronTx: any
): ITransactionReceipt {
  const scData = tronTx.raw_data.contract[0].parameter.value;

  const receiver =
    scData.contract_address ||
    scData.to_address ||
    scData.account_address ||
    scData.receiver_address;

  return {
    hash: ensureHexPrefix(tronTx.txID), // string
    value: scData?.call_value || "0",
    txFee: null,
    status:
      tronTx.ret[0].contractRet === "SUCCESS"
        ? TransactionStatus.Success
        : TransactionStatus.Failed,
    // Only if a transaction has been mined
    blockNumber: block.number, // ?:number
    timestamp: block.timestamp, // ?:number
    from: ensureHexAddress(parseTronHexAddress(scData.owner_address)), // string
    to: receiver ? ensureHexAddress(parseTronHexAddress(receiver)) : undefined,
    raw: tronTx.raw_data_hex, // ?:string
  };
}

export function normalizeExecutionResponse(
  method: string,
  abi: any,
  args: any[],
  res: any
) {
  const methodDef = findMethodDefinitionOnAbi(abi, method, args);

  if (!methodDef) {
    return res;
  }

  const responseNormalizer = methodOutputNormalizer(methodDef);

  return isArrayResponse(methodDef)
    ? res.map(responseNormalizer)
    : responseNormalizer(res, 0);
}
function isArrayResponse(methodDef: any) {
  return methodDef.outputs.length > 1;
}
function findMethodDefinitionOnAbi(
  abi: any,
  method: string,
  args: any[] = []
): typeof ERC20ABI[0] {
  return abi.find(
    (m: any) => m.name === method && m.inputs.length === args.length
  );
}
function getUnitaryType(type: string) {
  return type.replace(/\[\]/g, "");
}
function methodOutputNormalizer(methodDef: any) {
  return (value: any, index: number) => {
    const output = methodDef.outputs[index];
    const type = getUnitaryType(output.type);

    let normalizer = (_value: { toString: () => string }) => _value.toString();

    if (type === "address") {
      normalizer = (_value: string) =>
        ensureHexAddress(parseTronHexAddress(_value));
    }

    return arrayRecursiveApplier(normalizer)(value);
  };
}
export const isTronNativeToken = (address: string): boolean =>
  address.toLowerCase() === TronNativeToken.address.toLowerCase();

export const ensureHexAddress = (address: string): string => {
  if (address.startsWith("0x") || isTronNativeToken(address)) {
    return address;
  }

  return TronAddressFormat.toHex(address);
};

export const ensureTronAddress = (address: string): string => {
  if (address.startsWith("T") || isTronNativeToken(address)) {
    return address;
  }
  return TronAddressFormat.fromHex(address);
};

export const denormalizeExecutionArgs = (
  args: any[],
  method: string,
  abi: any[]
) => {
  if (!args || args.length === 0) {
    return args;
  }
  const methodDef = findMethodDefinitionOnAbi(abi, method, args);
  return args.map((arg, i) => {
    const type = getUnitaryType(methodDef.inputs[i].type);

    let denormalizer = (value: any): any => value;
    if (type === "address") {
      denormalizer = (value: any) => ensureTronAddress(value);
    }

    return arrayRecursiveApplier(denormalizer)(arg);
  });
};

const arrayRecursiveApplier =
  (methodToApply: any) =>
  (value: any): any => {
    if (Array.isArray(value)) {
      return value.map(arrayRecursiveApplier(methodToApply));
    }
    return methodToApply(value);
  };

const parseTronHexAddress = (address: string) => `0x${address.substring(2)}`;

export const ensureHexPrefix = (address: string): string =>
  address.startsWith("0x") ? address : `0x${address}`;

export const removeHexPrefix = (str: string): string =>
  str.startsWith("0x") ? str.substring(2) : str;
