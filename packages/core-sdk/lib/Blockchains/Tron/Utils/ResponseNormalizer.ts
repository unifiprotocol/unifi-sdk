import { IBlock, ITransactionReceipt, TransactionStatus } from "../../../Types";
import * as TronAddressFormat from "tron-format-address";
import { TronNativeToken } from "../NativeToken";

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
    hash: tronTx.txID, // string
    value: scData?.call_value || "0",
    status:
      tronTx.ret[0].contractRet === "SUCCESS"
        ? TransactionStatus.Success
        : TransactionStatus.Failed,
    // Only if a transaction has been mined
    blockNumber: block.number, // ?:number
    timestamp: block.timestamp, // ?:number

    from: TronAddressFormat.toHex(scData.owner_address), // string
    to: receiver ? TronAddressFormat.toHex(receiver) : undefined,
    raw: tronTx.raw_data_hex, // ?:string
  };
}

export function normalizeResponse(
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
function findMethodDefinitionOnAbi(abi: any, method: string, args: any[]) {
  return abi.find(
    (m: any) => m.name === method && m.inputs.length === args.length
  );
}

function methodOutputNormalizer(methodDef: any) {
  return (value: any, index: number) => {
    const output = methodDef.outputs[index];
    const _type = output.type;

    const type = _type.replace(/\[\]/g, "");

    let normalizer = (_value: any) => _value.toString();

    if (type === "address") {
      normalizer = (_value: any) => TronAddressFormat.fromHex(_value);
    }

    if (Array.isArray(value)) {
      return value.map(normalizer);
    }
    return normalizer(value);
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
  if (!address.startsWith("0x") || isTronNativeToken(address)) {
    return address;
  }

  return TronAddressFormat.fromHex(address);
};
