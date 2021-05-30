import { Wallet } from "@root/Entities/Wallet";
import { WalletConnectors } from "@root/Types";

const metamaskLogo =
  "data:image/png;base64,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";

export class MetamaskWallet extends Wallet {
  constructor() {
    super(WalletConnectors.Metamask, "Metamask", metamaskLogo, metamaskLogo);
  }
}

export const metamaskWallet = new MetamaskWallet();
