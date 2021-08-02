export enum IconexRequestType {
  HasAccount = "HAS_ACCOUNT",
  HasAddress = "HAS_ADDRESS",
  Address = "ADDRESS",
  JsonRpc = "JSON-RPC",
  Signing = "SIGNING",
}

export enum IconexEventType {
  Request = "ICONEX_RELAY_REQUEST",
  Response = "ICONEX_RELAY_RESPONSE",
}

export enum JsonRpcMethod {
  GetLastBlock = "icx_getLastBlock",
  GetBlockByHeight = "icx_getBlockByHeight",
  GetBlockByHash = "icx_getBlockByHash",
  Call = "icx_call",
  GetBalance = "icx_getBalance",
  GetScoreApi = "icx_getScoreApi",
  GetTotalSupply = "icx_getTotalSupply",
  GetTransactionResult = "icx_getTransactionResult",
  GetTransactionByHash = "icx_getTransactionByHash",
  SendTransaction = "icx_sendTransaction",
  SendTransactionAndWait = "icx_sendTransactionAndWait",
  WaitTransactionResult = "icx_waitTransactionResult",
  EstimateStep = "debug_estimateStep",
}
