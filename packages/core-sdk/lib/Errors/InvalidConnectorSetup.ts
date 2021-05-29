import { Blockchains, Connectors } from "@root/Types";

export class InvalidConnectorSetup extends Error {
  constructor(connector: Connectors, blockchain: Blockchains) {
    super(
      `The connector ${connector} does not support ${blockchain} blockchain`
    );

    Object.setPrototypeOf(this, InvalidConnectorSetup.prototype);
  }
}
