import { BaseEvent } from "../BaseEvent";

export const OpenNetworkModalEvent = Symbol("OpenNetworkModalEvent");

export class OpenNetworkModal extends BaseEvent<void> {
  constructor() {
    super(OpenNetworkModalEvent);
  }
}
