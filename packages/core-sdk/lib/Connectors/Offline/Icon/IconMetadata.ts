import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class IconMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Icon, "Icon", false, "", "");
  }
}

export const iconMetadata = new IconMetadata();
