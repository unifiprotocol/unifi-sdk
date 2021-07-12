import { ExecutionResponse, TronAdapter } from "@unifiprotocol/core-sdk";
import { BaseStakingAdapter } from "../BaseStakingAdapter";
type TronResource = 'BANDWIDTH'|'ENERGY'
interface TronFreezeOptions{
  resource: TronResource,
  duration?:number
}

interface TronUnfreezeOptions{
  resource: TronResource
}

export class TronStakingAdapter extends BaseStakingAdapter<TronAdapter> {
  protected address () {
    return this.adapter.getAddress()
  }
  freeze(amount: string, {resource, duration = 3}: TronFreezeOptions): Promise<ExecutionResponse<any>> {
    // TGzz8gjYiYRqpfmDwnLxfgPuLVNmpCswVp
    const tx = this.adapter.getProvider().transactionBuilder.freezeBalance( 
      this.adapter.getProvider().toSun(amount),
      duration,
      resource,
      this.address,
      this.address
    )
    return this.adapter.signAndSendTransaction(tx)
  }
  
  unfreeze(amount: string, {resource}:TronUnfreezeOptions): Promise<ExecutionResponse<any>> {
    const tx = this.adapter.getProvider().transactionBuilder.unfreezeBalance( 
      resource,this.address
    )
    return this.adapter.signAndSendTransaction(tx)
  }

  vote( validator: string, amount: string): Promise<ExecutionResponse<any> {
    const tx = this.adapter
      .getProvider()
      .transactionBuilder.vote({ [validator]: amount }, this.address);
    return this.adapter.signAndSendTransaction(tx)
  }

  unvote(validator: string, amount: string = '0'): Promise<ExecutionResponse<any>> {
    return this.vote(validator, amount)
  }
  needsFreeze(): boolean {
    return true;
  }
}
