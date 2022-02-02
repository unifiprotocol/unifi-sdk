import TronWeb from "tronweb";
import { ERC20ABI } from "../../../Abis/ERC20";
import {
  AdapterBalance,
  Address,
  ExecutionParams,
  ExecutionResponse,
} from "../../../Types";
import { BaseAdapter } from "../../../Adapters/BaseAdapter";
import { Opt } from "../../../Utils/Typings";
import { nonSuccessResponse, successResponse } from "../../../Adapters/Helpers";
import { hexlify } from "ethers/lib/utils";
import { BN } from "@unifiprotocol/utils";
import { TronChainId } from "../TronChainIds";

type TronContractInterface = Array<any>;
type TronProvider = TronWeb;
type Contract = any;

export class TronAdapter extends BaseAdapter<
  TronContractInterface,
  TronProvider
> {
  private _provider: Opt<TronProvider>;
  protected contracts: { [nameContract: string]: Contract } = {};

  setProvider(provider: TronProvider): void {
    this._provider = provider;
  }
  getProvider(): TronProvider {
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

  async initializeContract(
    contractAddress: string,
    abi: TronContractInterface
  ): Promise<void> {
    if (
      this.contracts[contractAddress] ||
      contractAddress === this.blockchainConfig.nativeToken.address
    ) {
      return;
    }

    const contract = await this._provider.contract(abi, contractAddress);

    this.contracts[contractAddress] = contract;
  }

  protected prepareExecuteArgs(args: any[]): string[] {
    return args.map((v) => {
      if (typeof v === "string") return v;
      if (Array.isArray(v)) {
        return this.prepareExecuteArgs(v as any[]) as any;
      }
      return hexlify(v as any);
    });
  }
  async execute<T = any>(
    contractAddress: string,
    method: string,
    values: Partial<ExecutionParams>,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>> {
    const { args, callValue } = values;
    try {
      const contract = this.contracts[contractAddress];

      if (
        contractAddress === this.blockchainConfig.nativeToken.address &&
        ["allowance", "approve"].includes(method)
      ) {
        return successResponse({
          method,
          value: BN(2 ** 256).toFixed(),
        });
      }

      if (isWrite) {
        const contractCall = await contract[method].apply(null, args).send({
          feeLimit: 100_000_000,
          callValue: callValue || 0,
          shouldPollResponse: false,
          keepTxID: true,
        });

        if (contractCall) {
          return successResponse({
            method,
            hash: contractCall,
            value: "",
          });
        }
      } else {
        const contractCall = await contract[method].apply(null, args).call();
        if (contractCall) {
          const value = Array.isArray(contractCall)
            ? contractCall.map((v) => v.toString())
            : contractCall.toString();

          return successResponse({
            method,
            hash: contractCall,
            value,
          });
        }
      }
      return nonSuccessResponse({
        method,
        params: args,
      });
    } catch (err) {
      return nonSuccessResponse({
        method,
        err,
      });
    }
  }

  async waitForTransaction(txnHash: string): Promise<"SUCCESS" | "FAILED"> {
    return new Promise<"FAILED" | "SUCCESS">((resolve) => {
      const ignoreNotFoundErrors = () => {
        return;
      };
      const isSuccess = (res: any) =>
        res.ret.some((r: any) => r.contractRet === "SUCCESS");
      const checkTx = () => {
        return this._provider.trx
          .getConfirmedTransaction(txnHash)
          .catch(ignoreNotFoundErrors)
          .then((res: any) => {
            if (typeof res === "object") {
              return resolve(isSuccess(res) ? "SUCCESS" : "FAILED");
            }
            setTimeout(checkTx, 1500);
          });
      };
      checkTx();
    });
  }
  getContractInterface(contractAddress: string): TronContractInterface {
    return this.contracts[this.toHexAddress(contractAddress)].abi;
  }
  async getBalance(address: Address = this.address): Promise<AdapterBalance> {
    const balance = await this._provider.trx.getBalance(address);
    return {
      name: this.blockchainConfig.nativeToken.symbol,
      balance,
    };
  }

  async isValidNetwork(network: string): Promise<boolean> {
    return network === TronChainId.Mainnet;
  }
  isValidAddress(address: string): boolean {
    try {
      this._provider.address.toHex(address);
    } catch (_) {
      return false;
    }
    return true;
  }

  getAddressLink(address: string): string {
    return this.blockchainConfig.explorer.address(address);
  }
  getTokenLink(address: string): string {
    return this.blockchainConfig.explorer.token(address);
  }
  getTxLink(hash: string | number): string {
    return this.blockchainConfig.explorer.tx(`${hash}`);
  }

  async initializeToken(
    tokenAddress: Address,
    abi: TronContractInterface = ERC20ABI
  ): Promise<void> {
    this.initializeContract(tokenAddress, abi);
  }

  toHexAddress(address: string): string {
    return this._provider.address.toHex(address);
  }
}
