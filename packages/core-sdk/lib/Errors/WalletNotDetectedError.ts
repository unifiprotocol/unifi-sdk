export class WalletNotDetectedError extends Error {
  constructor(public readonly wallet: string) {
    super(`${wallet} wallet was not found`);
    Object.setPrototypeOf(this, WalletNotDetectedError.prototype);
  }
}
