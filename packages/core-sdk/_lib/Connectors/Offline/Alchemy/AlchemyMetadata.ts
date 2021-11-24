import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class AlchemyMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Alchemy, "Alchemy", false, "", "");
  }
}

export const alchemyMetadata = new AlchemyMetadata();
