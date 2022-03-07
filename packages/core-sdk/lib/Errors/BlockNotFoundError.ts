import { Blockchains, BlockTag } from "../Types";

export class BlockNotFoundError extends Error {
  constructor(block: BlockTag, blockchain: Blockchains) {
    super(`Block #${block} not found on blockchain "${blockchain}"`);
    Object.setPrototypeOf(this, BlockNotFoundError.prototype);
  }
}
