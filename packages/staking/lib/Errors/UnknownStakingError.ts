export class UnknownStakingError extends Error {
  constructor(
    public message: string,
    public readonly originalError: Error = undefined
  ) {
    super(`There was an error processing staking transacion.`);

    Object.setPrototypeOf(this, UnknownStakingError.prototype);
  }
}
