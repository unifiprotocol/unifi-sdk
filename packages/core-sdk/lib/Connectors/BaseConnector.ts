import { IAdapter } from '@root/Adapters/IAdapter'
import { Blockchains } from '@root/Types'
import { IConnector } from './IConnector'

export abstract class BaseConnector implements IConnector {
  constructor(
    protected adapter: IAdapter,
    protected blockchain: Blockchains,
    protected _isWallet: boolean
  ) {}

  abstract connect(): Promise<IAdapter>
  abstract logout(): Promise<void>

  isWallet(): boolean {
    return this._isWallet
  }
}
