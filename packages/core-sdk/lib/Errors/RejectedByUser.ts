export class RejectedByUser extends Error {
  constructor() {
    super(`The user rejected the operation`);
    Object.setPrototypeOf(this, RejectedByUser.prototype);
  }
}
