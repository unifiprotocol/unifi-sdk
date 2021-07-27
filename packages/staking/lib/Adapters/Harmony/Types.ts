export type DelegationsResponse = DelegationsResponseItem[];

export interface DelegationsResponseItem {
  Undelegations: Undelegation[];
  amount: number;
  delegator_address: string;
  reward: number;
  validator_address: string;
  validator_info: any; // not needed, omitted for brevity
}

export interface Undelegation {
  Amount: number;
  Epoch: number;
}
