import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class TronGridMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.TronGrid, "TronGrid", false, "", "");
  }
}

export const tronGridMetadata = new TronGridMetadata();
