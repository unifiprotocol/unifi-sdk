export class InvalidNetworkError extends Error {
  constructor(public readonly network: string) {
    super(`Invalid network ${network}`);
    Object.setPrototypeOf(this, InvalidNetworkError.prototype);
  }
}
