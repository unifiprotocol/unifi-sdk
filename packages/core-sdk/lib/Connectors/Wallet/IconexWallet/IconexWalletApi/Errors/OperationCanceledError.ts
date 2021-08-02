export class OperationCanceledError extends Error {
  constructor(type: string) {
    super(`User has canceled ${type} request`);
  }
}
