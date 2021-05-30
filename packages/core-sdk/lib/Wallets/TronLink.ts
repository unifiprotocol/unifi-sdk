import { Wallet } from "@root/Entities/Wallet";
import { WalletConnectors } from "@root/Types";

const tronLinkLogo =
  "data:image/png;base64,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";

export class TronLinkWaltet extends Wallet {
  constructor() {
    super(WalletConnectors.TronLink, "TronLink", tronLinkLogo, tronLinkLogo);
  }
}

export const tronLinkWaltet = new TronLinkWaltet();
