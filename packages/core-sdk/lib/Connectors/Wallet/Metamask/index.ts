import { IAdapter } from '@root/Adapters/IAdapter'
import { WalletConnector } from '@root/Connectors/Wallet/WalletConnector'
import { InvalidNetworkError } from '@root/Errors/InvalidNetworkError'
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum: any
  }
}

export class MetamaskConnector extends WalletConnector {
  async connect(): Promise<IAdapter> {
    const ethAgent = this.getAgent()
    if (!ethAgent) {
      throw new Error('Provider not available')
    }
    const accounts: string[] = await ethAgent.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(ethAgent)
    const { chainId } = await provider.getNetwork()

    if (!this.adapter.isValidNetwork(`${chainId}`)) {
      throw new InvalidNetworkError()
    }
    const address = ethers.utils.getAddress(accounts[0])

    this.adapter.setAddress(address)
    this.adapter.setProvider(provider)

    return this.adapter
  }
}
