import { IConfig } from "../../Config";
import { BaseEvent } from "../BaseEvent";

export const ChangeNetworkEvent = Symbol("ChangeNetworkEvent");

export class ChangeNetwork extends BaseEvent<IConfig> {
  constructor(blockchainConfig: IConfig) {
    super(ChangeNetworkEvent, blockchainConfig);
  }
}

export const OpenConnectionModalEvent = Symbol("OpenConnectionModalEvent");

export class OpenConnectionModal extends BaseEvent<void> {
  constructor() {
    super(OpenConnectionModalEvent);
  }
}
