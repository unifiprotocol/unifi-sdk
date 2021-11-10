import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class AvalancheMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Avalanche, "Avalanche", false, "", "");
  }
}

export const avalancheMetadata = new AvalancheMetadata();
