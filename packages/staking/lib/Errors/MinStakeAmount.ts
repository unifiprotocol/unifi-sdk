export class MinStakeAmount extends Error {
  constructor(public min: string, public amount: string) {
    super(`The minimum amount is ${min} and you gave ${amount} votes.`);

    Object.setPrototypeOf(this, MinStakeAmount.prototype);
  }
}
