import { IAdapter } from '@root/Adapters/IAdapter'
import { WalletConnector } from '@root/Connectors/Wallet/WalletConnector'

declare global {
  interface Window {
    ethereum: any
  }
}
export class MathWalletConnector extends WalletConnector {
  async connect(): Promise<IAdapter> {
    return this.adapter
  }
}
