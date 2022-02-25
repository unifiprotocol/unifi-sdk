import { IConnectorFactoryParams } from "../../Types";
import { AxiosConcurrencyHandler } from "../../Utils/AxiosRateLimiter";

export interface ITronWebConnectorParams {
  fullHost: string;
  eventServer?: string;
  solidityNode?: string;
  privateKey?: string;
  headers?: Record<string, string>;
  rateLimiter?: AxiosConcurrencyHandler;
}

export type ITronConnectorFactoryParams =
  IConnectorFactoryParams<ITronWebConnectorParams>;
