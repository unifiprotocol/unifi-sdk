import { IAdapter } from '@root/Adapters/IAdapter'
import { BaseConnector } from '@root/Connectors/BaseConnector'
import { Blockchains } from '@root/Types'

export abstract class OfflineConnector extends BaseConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, false)
  }

  abstract connect(): Promise<IAdapter>
  async logout(): Promise<void> {}
}
