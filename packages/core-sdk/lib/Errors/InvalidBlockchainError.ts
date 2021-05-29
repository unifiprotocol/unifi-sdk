export class InvalidBlockchainError extends Error {
  constructor(public readonly blockchain: string) {
    super(`The blockchain "${blockchain}" is invalid`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidBlockchainError.prototype);
  }
}
