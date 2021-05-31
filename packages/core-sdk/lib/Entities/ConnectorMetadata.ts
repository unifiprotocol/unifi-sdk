import { OfflineConnectors, WalletConnectors } from "../Types";

export class ConnectorMetadata {
  constructor(
    public readonly name: WalletConnectors | OfflineConnectors,
    public readonly displayName: string,
    public readonly logoURI: string,
    public readonly logoURILight: string
  ) {}
}
