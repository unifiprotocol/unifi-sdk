export class AdapterNotConnectedError extends Error {
  constructor() {
    super(`Adapter not connected`);
    Object.setPrototypeOf(this, AdapterNotConnectedError.prototype);
  }
}
