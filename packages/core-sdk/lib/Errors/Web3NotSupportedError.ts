export class Web3NotSupportedError extends Error {
  constructor(public readonly blockchain: string) {
    super(`The blockchain "${blockchain}" does not support web3`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Web3NotSupportedError.prototype);
  }
}
