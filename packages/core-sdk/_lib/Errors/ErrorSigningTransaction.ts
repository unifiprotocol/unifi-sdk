export class ErrorSigningTransaction extends Error {
  constructor(public originalError: Error) {
    super(`There was an error signing transaction`);
    Object.setPrototypeOf(this, ErrorSigningTransaction.prototype);
  }
}
