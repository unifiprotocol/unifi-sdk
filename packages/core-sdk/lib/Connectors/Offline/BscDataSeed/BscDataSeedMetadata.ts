import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class BscDataSeedMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.BscDataSeed, "BscDataSeed", "", "");
  }
}

export const bscDataSeedMetadata = new BscDataSeedMetadata();
