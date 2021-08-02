import { JsonRpcMethod } from "./enums";

export interface IconexEventPayload<Payload = any> {
  type: string;
  payload: Payload;
}

export type IconexEvent<Detail> = CustomEvent<IconexEventPayload<Detail>>;

export type WeiBalance = string;
export type Bech32Address = string;

export type AddressReqPayload = string;
export type AddressResPayload = string;
export type HasAddressResPayload = { hasAddress: boolean };
export type HasAccountResPayload = { hasAccount: boolean };
export type SignTransactionReqPayload = { from: string; hash: string };

export type JsonRpcReqPayload<Params = any> = {
  jsonrpc: "2.0";
  method: JsonRpcMethod;
  id: number;
  params: Params;
};

export type JsonRpcResPayload<Result = any> = {
  jsonrpc: "2.0";
  method: string;
  id: number;
  result: Result;
  error?: {
    code: number;
    message: string;
  };
};
