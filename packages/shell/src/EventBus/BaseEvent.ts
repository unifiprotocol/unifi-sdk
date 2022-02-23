export abstract class BaseEvent<Payload> {
  constructor(public name: symbol, public readonly payload: Payload) {}
}
