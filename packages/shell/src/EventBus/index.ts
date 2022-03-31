import { eventEmitterFactory } from "./Factory";

export const ShellEventBus = eventEmitterFactory<symbol>();
export { ShellEvents } from "./Events";
