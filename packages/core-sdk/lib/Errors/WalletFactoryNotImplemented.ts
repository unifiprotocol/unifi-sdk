export class WalletFactoryNotImplemented extends Error {
  constructor(public readonly blockchain: string) {
    super(
      `Wallet creation through connectionFactory is not ready on the ${blockchain} blockchain`
    );
    Object.setPrototypeOf(this, WalletFactoryNotImplemented.prototype);
  }
}
