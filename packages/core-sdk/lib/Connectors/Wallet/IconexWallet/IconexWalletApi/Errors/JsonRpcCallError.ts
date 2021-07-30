import { JsonRpcResPayload } from "../Types";

export class JsonRpcCallError extends Error {
  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly rawResponse: JsonRpcResPayload
  ) {
    super(message);
  }
}
