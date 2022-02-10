import EventEmitter from "eventemitter3";

type ShellEvents = "REFRESH_BALANCES" | "ADD_CURRENCY" | "WIPE";

class ShellBus extends EventEmitter<ShellEvents> {}

export default new ShellBus();
