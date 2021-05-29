import { Connectors } from '@root/Types'

export class UnknownConnectorError extends Error {
  constructor(connector: Connectors) {
    super(`Unknown connector "${connector}"`)
  }
}
