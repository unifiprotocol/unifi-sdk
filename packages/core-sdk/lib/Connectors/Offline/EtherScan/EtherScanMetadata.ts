import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class EtherScanMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.EtherScan, "EtherScan", "", "");
  }
}

export const etherScanMetadata = new EtherScanMetadata();
