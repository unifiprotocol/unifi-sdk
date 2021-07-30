import {
  JsonRpcCallError,
  OperationCanceledError,
  OperationTimeoutError,
} from "./Errors";
import {
  getCancelType,
  genRandomId,
  getRequestType,
  getResponseType,
  rpcRequestMatchesResponse,
} from "./helpers";
import {
  Bech32Address,
  IconexEventPayload,
  WeiBalance,
  AddressReqPayload,
  AddressResPayload,
  HasAccountResPayload,
  HasAddressResPayload,
  JsonRpcResPayload,
  SignTransactionReqPayload,
} from "./Types";
import { IconexEventType, IconexRequestType, JsonRpcMethod } from "./enums";
import { sha3_256 } from "js-sha3";

interface IconexRequestOpts {
  isCancelable: boolean;
}

type IconexEvent<Detail> = CustomEvent<IconexEventPayload<Detail>>;

export class IconexWalletApi {
  static enums = { IconexEventType, IconexRequestType, JsonRpcMethod };
  iconexRequest<ResPayload = any>(
    type: IconexRequestType,
    payload: any = undefined,
    { isCancelable }: IconexRequestOpts = {
      isCancelable: true,
    }
  ): Promise<ResPayload> {
    const responseType = getResponseType(type);
    const cancelType = getCancelType(type);
    return new Promise((resolve) => {
      let cancelTimeout: any;

      const listener: any = (evt: IconexEvent<any>) => {
        if (isCancelable && evt.detail.type === cancelType) {
          window.removeEventListener(IconexEventType.Response, listener);
          throw new OperationCanceledError(type);
        }

        if (evt.detail.type !== responseType) {
          return;
        }

        if (
          type === IconexRequestType.JsonRpc &&
          !rpcRequestMatchesResponse(payload, evt.detail.payload)
        ) {
          return;
        }

        window.removeEventListener(IconexEventType.Response, listener);
        clearTimeout(cancelTimeout);
        resolve(evt.detail.payload);
      };

      const requestEvent = new CustomEvent(IconexEventType.Request, {
        detail: {
          type: getRequestType(type),
          payload,
        },
      });

      window.dispatchEvent(requestEvent);
      window.addEventListener(IconexEventType.Response, listener);
      if (!cancelType) {
        console.log("cancel timeout", type);
        // some requests does not notify that the user canceled the operation,
        // therefore we cleanup after 10 second to avoid listener memory leaks
        cancelTimeout = setTimeout(() => {
          window.removeEventListener(IconexEventType.Response, listener);
          throw new OperationTimeoutError(type);
        }, 10000);
      }
    });
  }

  jsonRpcCall<Params, Result>(
    method: JsonRpcMethod,
    params: Params
  ): Promise<JsonRpcResPayload<Result>> {
    return this.iconexRequest<JsonRpcResPayload<Result>>(
      IconexRequestType.JsonRpc,
      {
        jsonrpc: "2.0",
        id: genRandomId(),
        method,
        params,
      },
      { isCancelable: false }
    ).then((res) => {
      if (res.error) {
        throw new JsonRpcCallError(res.error.code, res.error.message, res);
      }
      return res;
    });
  }

  hasAccount(): Promise<boolean> {
    return this.iconexRequest<HasAccountResPayload>(
      IconexRequestType.HasAccount,
      undefined,
      { isCancelable: false }
    ).then((res) => res.hasAccount);
  }

  hasAddress(address: AddressReqPayload): Promise<boolean> {
    return this.iconexRequest<HasAddressResPayload>(
      IconexRequestType.HasAddress,
      address,
      { isCancelable: false }
    ).then((res) => res.hasAddress);
  }

  signTransaction(
    from: string,
    method: JsonRpcMethod,
    tx: any
  ): Promise<string> {
    return this.iconexRequest(
      IconexRequestType.Signing,
      { from, hash: hashTx(method, tx) },
      {
        isCancelable: true,
      }
    );
  }

  getAccount(): Promise<Bech32Address> {
    return this.iconexRequest<AddressResPayload>(IconexRequestType.Address);
  }

  getBalance(address: string): Promise<WeiBalance> {
    return this.jsonRpcCall<{ address: string }, string>(
      JsonRpcMethod.GetBalance,
      { address }
    ).then(({ result }) => `${parseInt(result, 16)}`);
  }
}

const serializeTx = (obj: Record<string, any>, level = 0): string => {
  if (typeof obj === "string") {
    return obj;
  }
  const s = Object.entries(obj)
    .map(([key, value]) => {
      return `${key}.${serializeTx(value, level + 1)}`;
    })
    .join(".");
  return level === 0 ? s : `{${s}}`;
};
const hashTx = (method: string, obj: Record<string, any>) =>
  sha3_256(`${method}.${serializeTx(obj)}`);
