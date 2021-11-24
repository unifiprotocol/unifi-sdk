import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class HarmonyMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Harmony, "Harmony", false, "", "");
  }
}

export const harmonyMetadata = new HarmonyMetadata();
