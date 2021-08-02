//import IconService from "icon-sdk-js";
import { Blockchains, EthChainIds } from "../../Types";
import IconService from "icon-sdk-js";
import {
  AdapterBalance,
  Address,
  ExecutionParams,
  ExecutionResponse,
} from "../Types";
import { ContractInterface } from "ethers";
import { BaseAdapter } from "../BaseAdapter";
import { Opt } from "../../Utils/Typings";
import { nonSuccessResponse, successResponse } from "../Helpers";
import { BN } from "../../Utils/BigNumber";
import { ICXNativeToken } from "../../Tokens/ICXNativeToken";

type IconProvider = IconService;
type IconContractInterface = any;

export class IconAdapter extends BaseAdapter<
  IconContractInterface,
  IconProvider
> {
  private _provider: Opt<IconProvider>;

  protected contracts: { [nameContract: string]: any } = {};
  protected stablePairs: string[] = [];
  protected lastGasLimit = "30000";
  protected readonly chainId: EthChainIds;
  protected abi: Record<string, ContractInterface> = {};

  constructor() {
    super(Blockchains.Icon, ICXNativeToken, "https://tracker.icon.foundation");
  }

  setProvider(provider: IconProvider): void {
    this._provider = provider;
  }
  getProvider(): IconProvider {
    return this._provider;
  }
  resetContracts(): void {
    this.contracts = {};
  }
  isConnected(): boolean {
    return !!this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  get hexAddress(): string {
    return this.address;
  }
  get ioAddress(): string {
    return this.address;
  }

  async initializeContract(
    contractAddress: string,
    abi: IconContractInterface
  ): Promise<void> {
    throw new Error("Not implemented");
  }

  async execute<T = any>(
    contractAddress: string,
    method: string,
    values: Partial<ExecutionParams>,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>> {
    throw new Error("Not implemented");
    if (
      contractAddress === this.nativeToken.address &&
      ["allowance", "approve"].includes(method)
    ) {
      return successResponse({
        method,
        value: BN(2 ** 256).toFixed(),
      });
    }

    try {
      return successResponse({
        method,
      });
    } catch (err) {
      return nonSuccessResponse({
        method,
        err,
      });
    }
  }
  signTransaction(tx: any): Promise<any> {
    throw new Error("Not implemented");
    throw new Error("Method not implemented.");
  }
  sendTransaction<T = any>(tx: any): Promise<ExecutionResponse<T>> {
    throw new Error("Not implemented");
    throw new Error("Method not implemented.");
  }
  async waitForTransaction(txnHash: string): Promise<"SUCCESS" | "FAILED"> {
    throw new Error("Not implemented");
    return new Promise<"FAILED" | "SUCCESS">((resolve) => {
      const checkTx = () => {
        if (status) {
          resolve(status as any);
        } else {
          setTimeout(checkTx, 1500);
        }
      };

      checkTx();
    });
  }
  getContractInterface(contractAddress: string): IconContractInterface {
    return this.contracts[contractAddress].abi;
  }
  async getBalance(address: Address = this.address): Promise<AdapterBalance> {
    throw new Error("Not implemented");
    const balance = await this.getProvider().getBalance(address).execute();
    return {
      balance: balance.toFixed(),
      name: this.nativeToken.symbol,
    };
  }
  async isValidNetwork(network: string): Promise<boolean> {
    // iconex does not apparently support testnet
    return true;
  }
  isValidAddress(address: string): boolean {
    throw new Error("Not implemented");
  }

  getAddressLink(address: string): string {
    return `${this.explorerUrl}/address/${address}`;
  }
  getTokenLink(address: string): string {
    return `${this.explorerUrl}/token/${address}`;
  }
  getTxLink(hash: string | number): string {
    return `${this.explorerUrl}/transaction/${hash}`;
  }

  async initializeToken(
    tokenAddress: Address,
    abi: ContractInterface
  ): Promise<void> {
    this.initializeContract(tokenAddress, abi);
  }
}
