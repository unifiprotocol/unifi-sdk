import { Harmony, ExtensionInterface } from "@harmony-js/core";
import { HarmonyAddress } from "@harmony-js/crypto";
import { Contract } from "@harmony-js/contract";
import { ChainType, hexToNumber } from "@harmony-js/utils";

import { ERC20ABI } from "../../../Abis/ERC20";
import {
  AdapterBalance,
  Address,
  ExecutionParams,
  ExecutionResponse,
  EthChainIds,
  ITransactionReceipt,
  GetTransactionsFromEventsOptions,
} from "../../../Types";
import { ContractInterface } from "ethers";
import { BaseAdapter } from "../../../Adapters/BaseAdapter";
import { Opt } from "../../../Utils/Typings";
import { nonSuccessResponse, successResponse } from "../../../Adapters/Helpers";
import { hexlify } from "ethers/lib/utils";
import { BN } from "@unifiprotocol/utils";
import {
  IBlock,
  IBlockWithTransactions,
  BlockTag,
  ITransactionWithLogs,
} from "../../../Types/BlockAndTxs";

export type HarmonyProvider = ExtensionInterface & {
  network: { chain_id: number };
};
type HarmonyContractInterface = any;
export class HarmonyAdapter extends BaseAdapter<
  HarmonyContractInterface,
  HarmonyProvider
> {
  private _provider: Opt<HarmonyProvider>;

  protected contracts: { [nameContract: string]: Contract } = {};
  protected stablePairs: string[] = [];
  protected lastGasLimit = "30000";
  protected readonly chainId: EthChainIds;
  protected abi: Record<string, ContractInterface> = {};
  public readonly harmonyClient = new Harmony(`https://api.s0.t.hmny.io`, {
    chainType: ChainType.Harmony,
    chainId: 1,
  });

  setProvider(provider: HarmonyProvider): void {
    this._provider = provider;
  }
  getProvider(): HarmonyProvider {
    return this._provider;
  }
  resetContracts(): void {
    this.contracts = {};
  }
  isConnected(): boolean {
    return !!this.address;
  }

  setAddress(address: string): void {
    this.address = new HarmonyAddress(address).basicHex;
  }

  get hexAddress(): string {
    return new HarmonyAddress(this.address).basicHex;
  }
  get oneAddress(): string {
    return new HarmonyAddress(this.address).bech32;
  }

  async initializeContract(
    contractAddress: string,
    abi: HarmonyContractInterface
  ): Promise<void> {
    if (
      this.contracts[contractAddress] ||
      contractAddress === this.blockchainConfig.nativeToken.address
    ) {
      return;
    }
    const contract = this.harmonyClient.contracts.createContract(
      abi,
      this.toHexAddress(contractAddress)
    );
    contract.wallet.signTransaction = this._provider.signTransaction;

    this.contracts[this.toHexAddress(contractAddress)] = contract;
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
    contractAddress = this.toHexAddress(contractAddress);
    if (
      contractAddress === this.blockchainConfig.nativeToken.address &&
      ["allowance", "approve"].includes(method)
    ) {
      return successResponse({
        method,
        value: BN(2 ** 256).toFixed(),
      });
    }

    try {
      const contractArgs = this.prepareExecuteArgs(values.args);
      const contractMethod = this.contracts[contractAddress].methods[method](
        ...contractArgs
      );

      const txOpts: any = { gasPrice: "0x3B9ACA00", from: this.hexAddress };
      if (values.callValue) {
        txOpts.value = values.callValue;
      }
      const estimatedGasLimit = await contractMethod
        .estimateGas(txOpts)
        .then(hexToNumber);

      const opts = {
        ...txOpts,
        gasLimit: estimatedGasLimit,
      };

      let res;
      if (isWrite) {
        const { transaction } = await contractMethod.send(opts);
        res = {
          hash: transaction.id,
        };
      } else {
        const value = await contractMethod.call(opts);
        res = {
          value,
        };
      }
      return successResponse({
        method,
        ...res,
        value: decodeValue(res.value),
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
      const checkTx = () => {
        return this.harmonyClient.blockchain
          .getTransactionReceipt({
            txnHash,
          })
          .then((res) => {
            const status =
              {
                "0x0": "FAILED",
                "0x1": "SUCCESS",
              }[res?.result?.status as string] || undefined;
            if (status) {
              resolve(status as any);
            } else {
              setTimeout(checkTx, 1500);
            }
          });
      };
      checkTx();
    });
  }
  getContractInterface(contractAddress: string): HarmonyContractInterface {
    return this.contracts[this.toHexAddress(contractAddress)].abi;
  }
  async getBalance(address: Address = this.address): Promise<AdapterBalance> {
    const hexBalance = await this.harmonyClient.blockchain.getBalance({
      address,
    });
    const balance = this.harmonyClient.utils.hexToNumber(hexBalance.result);
    return {
      name: this.blockchainConfig.nativeToken.symbol,
      balance,
    };
  }
  async isValidNetwork(network: string): Promise<boolean> {
    return network === `1`;
  }
  isValidAddress(address: string): boolean {
    return this.harmonyClient.utils.isValidAddress(address);
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

  getDecodedTransactionWithLogs(): Promise<ITransactionWithLogs> {
    throw new Error("Method not implemented. Use Harmony Web3 Adapter ");
  }
  getTransactionsFromEvents(): Promise<string[]> {
    throw new Error("Method not implemented. Use Harmony Web3 Adapter ");
  }

  async initializeToken(
    tokenAddress: Address,
    abi: ContractInterface = ERC20ABI
  ): Promise<void> {
    this.initializeContract(tokenAddress, abi);
  }

  toHexAddress(address: string): string {
    if (this.blockchainConfig.nativeToken.address === address) {
      return address;
    }
    return new HarmonyAddress(address).basicHex;
  }

  getBlock(height: BlockTag): Promise<IBlock> {
    return this.harmonyClient.blockchain
      .getBlockByHash({ blockHash: height })
      .then(mapHmyBlockToGlobal);
  }

  async getBlockWithTxs(height: BlockTag): Promise<IBlockWithTransactions> {
    const hmyBlockResult = await this.harmonyClient.blockchain.getBlockByHash({
      blockHash: height,
    });
    const block = mapHmyBlockToGlobal(hmyBlockResult);
    block.transactions = hmyBlockResult.result.transactions.map((tx: any) =>
      mapHmyTxToGlobal(block, tx)
    );
    return block;
  }
}

function decodeValue(value: any): any {
  if (Array.isArray(value)) {
    return value.map((v) => decodeValue(v)).join(",");
  }
  if (value?.constructor?.name === "BN") {
    return value.toString();
  }
  return value;
}

function mapHmyTxToGlobal(block: IBlock, hmyTx: any): ITransactionReceipt {
  return {
    hash: hmyTx.hash,
    blockNumber: block.number,
    blockHash: block.hash,
    timestamp: block.timestamp,
    from: hmyTx.from,
    to: hmyTx.to,
    raw: hmyTx.input,
  };
}

function mapHmyBlockToGlobal({ result }: { result: any }) {
  return {
    hash: result.hash,
    parentHash: result.parentHash,
    number: Number(hexToNumber(result.number)),
    timestamp: Number(hexToNumber(result.timestamp)),
    transactions: result.transactions.map((tx: any) => tx.hash),
  };
}
