import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class TronGridMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.TronGrid, "TronGrid", "", "");
  }
}

export const tronGridMetadata = new TronGridMetadata();
