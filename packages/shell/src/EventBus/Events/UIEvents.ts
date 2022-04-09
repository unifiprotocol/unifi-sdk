import { BaseEvent } from "../BaseEvent";

export const OpenNetworkModalEvent = Symbol("OpenNetworkModalEvent");
export const ChangeSidebarStateEvent = Symbol("ChangeSidebarStateEvent");

export class OpenNetworkModal extends BaseEvent<void> {
  constructor() {
    super(OpenNetworkModalEvent);
  }
}

interface ChangeSidebarStatePayload {
  isOpen: boolean;
}
export class ChangeSidebarState extends BaseEvent<ChangeSidebarStatePayload> {
  constructor(payload: ChangeSidebarStatePayload) {
    super(ChangeSidebarStateEvent, payload);
  }
}
