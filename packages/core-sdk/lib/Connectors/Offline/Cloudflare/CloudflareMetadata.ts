import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class CloudflareMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Cloudflare, "Cloudflare", "", "");
  }
}

export const cloudflareMetadata = new CloudflareMetadata();
