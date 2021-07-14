export class InsufficientVotingPower extends Error {
  constructor(public available: string, public amount: string) {
    super(
      `Your voting power is ${available} and you tried giving ${amount} votes.`
    );

    Object.setPrototypeOf(this, InsufficientVotingPower.prototype);
  }
}
