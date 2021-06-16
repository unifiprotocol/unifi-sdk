import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class CloudflareMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Cloudflare, "Cloudflare", false, "", "");
  }
}

export const cloudflareMetadata = new CloudflareMetadata();
