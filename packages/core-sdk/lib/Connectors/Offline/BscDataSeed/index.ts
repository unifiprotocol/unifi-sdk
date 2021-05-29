import { EthChainIds } from '@root/Types'
import { IAdapter } from '@root/Adapters/IAdapter'
import { ethers } from 'ethers'
import { OfflineConnector } from '../OfflineConnector'

export class BscDataSeedConnector extends OfflineConnector {
  async connect(): Promise<IAdapter> {
    // TODO network cannot be hardcoded here
    this.adapter.setProvider(
      new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/', EthChainIds.Bsc)
    )
    return this.adapter
  }

  async logout(): Promise<void> {}
}
