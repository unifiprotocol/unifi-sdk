import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class PolygonMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Polygon, "Polygon", false, "", "");
  }
}

export const polygonMetadata = new PolygonMetadata();
