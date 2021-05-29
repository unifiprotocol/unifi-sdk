import { Blockchains } from "@root/Types";

export class UnknownBlockchainError extends Error {
  constructor(blockchain: Blockchains) {
    super(`Unknown blockchain "${blockchain}"`);
    Object.setPrototypeOf(this, UnknownBlockchainError.prototype);
  }
}
