export class WalletIsLockedError extends Error {
  constructor(public readonly wallet: string) {
    super(`${wallet} wallet seems to be locked`);
    Object.setPrototypeOf(this, WalletIsLockedError.prototype);
  }
}
