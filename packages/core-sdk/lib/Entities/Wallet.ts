import { WalletConnectors } from "@root/Types";

export class Wallet {
  constructor(
    public readonly name: WalletConnectors,
    public readonly displayName: string,
    public readonly logoURI: string,
    public readonly logoURILight: string
  ) {}
}
