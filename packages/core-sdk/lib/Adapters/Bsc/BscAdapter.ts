import { EthBaseAdapter } from '@root/Adapters/Eth/EthBaseAdapter'
import { EthChainIds } from '@root/Types'
import { BNB } from './NativeToken'

export class BscAdapter extends EthBaseAdapter {
  constructor() {
    super(BNB, EthChainIds.Bsc, 'https://bscscan.com')
  }
}
