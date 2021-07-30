import { IconexRequestType } from "./enums";
import { JsonRpcReqPayload, JsonRpcResPayload } from "./Types";

export const getRequestType = (type: IconexRequestType): string =>
  `REQUEST_${type}`;

export const getResponseType = (type: IconexRequestType): string =>
  `RESPONSE_${type}`;

export const getCancelType = (type: IconexRequestType): string =>
  `CANCEL_${type}`;

export const genRandomId = (): number => {
  return Math.floor(Math.random() * (10000 - 1)) + 1;
};

export const rpcRequestMatchesResponse = (
  requestPayload: JsonRpcReqPayload,
  responsePayload: JsonRpcResPayload
): boolean => requestPayload.id === responsePayload.id;
