import { BaseEvent } from "../BaseEvent";

export const AdapterConnectedEvent = Symbol("AdapterConnectedEvent");
export const AddressChangedEvent = Symbol("AddressChangedEvent");
export const NetworkChangedEvent = Symbol("NetworkChangedEvent");

export class AdapterConnected extends BaseEvent<void> {
  constructor() {
    super(AdapterConnectedEvent);
  }
}

export class AddressChanged extends BaseEvent<string> {
  constructor(address: string) {
    super(AddressChangedEvent, address);
  }
}

export class NetworkChanged extends BaseEvent<number> {
  constructor(chainId: number) {
    super(NetworkChangedEvent, chainId);
  }
}
