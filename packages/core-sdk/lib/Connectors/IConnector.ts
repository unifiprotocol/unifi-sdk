import { IAdapter } from '@root/Adapters/IAdapter'

export interface IConnector {
  connect(): Promise<IAdapter>
  logout(): Promise<void>
  isWallet(): boolean
}
