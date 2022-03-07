import EventEmitter from "eventemitter3";
import { BaseEvent } from "./BaseEvent";

export const eventEmitterFactory = <Events extends symbol>() => {
  const emitter = new EventEmitter();
  type MyEventListener<T> = (event: T) => void;

  return {
    on: <T extends BaseEvent<any>>(event: Events, fn: MyEventListener<T>) =>
      emitter.on(event, fn),
    once: <T extends BaseEvent<any>>(event: Events, fn: MyEventListener<T>) =>
      emitter.once(event, fn),
    off: <T extends BaseEvent<any>>(event: Events, fn: MyEventListener<T>) =>
      emitter.off(event, fn),
    emit: <T extends BaseEvent<any>>(event: T) => {
      const eventName = String(event.name).match(/Symbol\((.+)\)/)![1];
      console.debug(`[Emitted]: ${eventName}`);
      emitter.emit(event.name, event);
    },
  };
};
