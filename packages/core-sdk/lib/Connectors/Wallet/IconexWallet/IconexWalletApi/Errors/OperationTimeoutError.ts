export class OperationTimeoutError extends Error {
  constructor(type: string) {
    super(`Operation timed out or the user has canceled the ${type} request`);
  }
}
