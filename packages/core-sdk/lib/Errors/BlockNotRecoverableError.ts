import { Blockchains, BlockTag } from "../Types";

export class BlockNotRecoverableError extends Error {
  constructor(block: BlockTag, blockchain: Blockchains) {
    super(`Block #${block} not recoverable on blockchain "${blockchain}"`);
    Object.setPrototypeOf(this, BlockNotRecoverableError.prototype);
  }
}
