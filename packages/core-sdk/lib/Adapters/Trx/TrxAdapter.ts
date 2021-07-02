import { AdapterBalance, ExecutionParams, ExecutionResponse } from "../Types";
import { BlockTag, Block } from "@ethersproject/abstract-provider";
import { ContractInterface } from "@ethersproject/contracts";
import { BaseAdapter } from "../BaseAdapter";
import { TRXNativeToken } from "../../Tokens/TRXNativeToken";
import { XRC20ABI } from "../Iotex/ABIs/XRC20ABI";
import { Blockchains } from "../../Types";
import TronWeb from "tronweb";
import { nonSuccessResponse, successResponse } from "../Helpers";
import { BN } from "../../Utils/BigNumber";

declare global {
  interface Window {
    tronWeb: any;
  }
}
type TronContract = any;
export class TrxAdapter extends BaseAdapter<TronContract, TronWeb> {
  private tronWeb: any;
  private contracts: Record<string, TronContract> = {};

  constructor() {
    super(Blockchains.Tron, TRXNativeToken, "https://tronscan.org/");
  }

  getProvider(): TronWeb {
    return this.tronWeb;
  }

  getContractInterface(contractAddress: string): TronContract {
    return this.contracts[contractAddress];
  }

  setProvider(tronWeb: TronWeb): void {
    this.tronWeb = tronWeb;
    this.tronWeb.setAddress("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
  }
  resetContracts(): void {
    this.contracts = {};
  }
  isConnected(): boolean {
    return !!this.getAddress();
  }
  async initializeContract(contractAddress: string): Promise<void> {
    this.contracts[contractAddress] = await this.getContractInstance(
      contractAddress
    );
  }

  private async getContractInstance(contractAddress: string) {
    const storageKey = `tron-contract-${contractAddress}`;
    const cachedInstance = localStorage.getItem(storageKey);
    if (cachedInstance) {
      return this.tronWeb.contract(JSON.parse(cachedInstance), contractAddress);
    }

    return this.tronWeb
      .contract()
      .at(contractAddress)
      .then((ins: any) => {
        localStorage.setItem(storageKey, JSON.stringify(ins.abi));
        this.tronWeb.contract(ins.abi, contractAddress);
      });
  }

  async initializeToken(contractAddress: string): Promise<void> {
    return this.initializeContract(contractAddress);
  }

  async execute<T = any>(
    contractAddress: string,
    method: string,
    params: ExecutionParams,
    isWrite = false
  ): Promise<ExecutionResponse<T>> {
    this.gatherExecuteStats(method, {
      contractAddress,
      params,
    });
    try {
      const contract = this.contracts[contractAddress];
      const { args, callValue } = params;

      // ALLOWANCE ON TRX ALWAYS RETURN MAX
      if (
        contractAddress === this.nativeToken.address &&
        ["allowance", "approve"].includes(method)
      ) {
        return successResponse({
          value: BN(2 ** 256).toFixed(),
          hash: "",
          method,
          params,
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
            value: "",
            hash: contractCall,
            method,
            params,
          });
        }
      } else {
        const contractCall = await contract[method].apply(null, args).call();
        if (contractCall) {
          const value = contractCall.toString();
          return {
            success: true,
            value,
            hash: "",
            method,
            params,
          };
        }
      }
      return successResponse({ method, params });
    } catch (err) {
      return nonSuccessResponse({ method, params, err });
    }
  }
  waitForTransaction(transactionHash: string): Promise<"SUCCESS" | "FAILED"> {
    return new Promise<"FAILED" | "SUCCESS">((resolve) => {
      const checkTx = (hash: string) => {
        return this.tronWeb.trx
          .getConfirmedTransaction(hash)
          .then((res: any) => {
            if (typeof res !== "string") {
              return res;
            }
          });
      };

      const interval = setInterval(() => {
        checkTx(transactionHash).then((res: any) => {
          if (res) {
            const isReverted = (res.ret || []).some(
              (i: any) => i.contractRet === "REVERT"
            );
            clearInterval(interval);
            resolve(isReverted ? "FAILED" : "SUCCESS");
          }
        });
      }, 5000);
    });
  }
  async getBalance(): Promise<AdapterBalance> {
    if (!this.isConnected()) {
      return { name: this.nativeToken.name, balance: "0" };
    }
    const balanceOf = await this.tronWeb.trx.getBalance(this.getAddress());

    const balance = BN(balanceOf.toString() || 0).toFixed();

    return { name: this.nativeToken.name, balance };
  }
  async isValidNetwork(network: string): Promise<boolean> {
    return true;
  }
  getTxLink(hash: string): string {
    return `${this.explorerUrl}/transaction/${hash}`;
  }
  getAddressLink(hash: string): string {
    return `${this.explorerUrl}/address/${hash}`;
  }
  getTokenLink(hash: string): string {
    return `${this.explorerUrl}/token/${hash}`;
  }
  isValidAddress(address: string): boolean {
    return this.tronWeb.isAddress(address);
  }
}
