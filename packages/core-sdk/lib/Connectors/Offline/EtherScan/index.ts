import { IAdapter } from '@root/Adapters/IAdapter'
import { ethers } from 'ethers'
import { blockchainToEthChainId } from '@root/helpers'
import { OfflineConnector } from '../OfflineConnector'

export class EtherScanConnector extends OfflineConnector {
  async connect(): Promise<IAdapter> {
    const chainId = blockchainToEthChainId(this.blockchain)
    this.adapter.setProvider(new ethers.providers.EtherscanProvider(chainId))
    return this.adapter
  }
}
