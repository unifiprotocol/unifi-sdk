export class NotImplementedError extends Error {
  constructor(msg = "Operation not implemented or supported") {
    super(msg);
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}
