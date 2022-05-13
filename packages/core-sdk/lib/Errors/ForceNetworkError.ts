export class ForceNetworkError extends Error {
  constructor() {
    super(`Force network failed`);
    Object.setPrototypeOf(this, ForceNetworkError.prototype);
  }
}
