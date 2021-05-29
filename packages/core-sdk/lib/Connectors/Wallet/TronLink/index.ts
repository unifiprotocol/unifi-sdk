import { IAdapter } from '@root/Adapters/IAdapter'
import { WalletConnector } from '@root/Connectors/Wallet/WalletConnector'
import { sleep } from '@root/Utils/Sleep'

export class TronLinkConnector extends WalletConnector {
  async connect(): Promise<IAdapter> {
    await sleep(500)
    const address = window.tronWeb.defaultAddress.base58 || ''
    this.adapter.setAddress(address)
    return this.adapter
  }
}
