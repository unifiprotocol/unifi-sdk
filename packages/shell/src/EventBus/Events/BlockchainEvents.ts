import { IConfig } from "../../Config";
import { BaseEvent } from "../BaseEvent";

export const ChangeNetworkEvent = Symbol("ChangeNetworkEvent");

export class ChangeNetwork extends BaseEvent<IConfig> {
  constructor(blockchainConfig: IConfig) {
    super(ChangeNetworkEvent, blockchainConfig);
  }
}
