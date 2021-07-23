import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class IotexMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Iotex, "Iotex", false, "", "");
  }
}

export const iotexMetadata = new IotexMetadata();
