export class CannotSignUnconnectedError extends Error {
  constructor() {
    super(
      `In order to sign a transaction you need to be connected using a wallet`
    );

    Object.setPrototypeOf(this, CannotSignUnconnectedError.prototype);
  }
}
