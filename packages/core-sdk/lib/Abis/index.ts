import { ERC20ABI } from "../Adapters/Eth/ABIs/ERC20";
import { TRC20ABI } from "../Adapters/Trx/ABIs/TRC20";
import { XRC20ABI } from "../Adapters/Iotex/ABIs/XRC20ABI";
import { HRC20ABI } from "../Adapters/Harmony/ABIs/HRC20";
import { Blockchains } from "../Types";

const ethABI = { ERC20ABI, token: ERC20ABI };

export const ABIs = {
  [Blockchains.Ethereum]: ethABI,
  [Blockchains.Binance]: ethABI,
  [Blockchains.EthereumRopsten]: ethABI,
  [Blockchains.Tron]: { TRC20ABI, token: TRC20ABI },
  [Blockchains.Iotex]: { XRC20ABI, token: XRC20ABI },
  [Blockchains.Harmony]: { HRC20ABI, token: HRC20ABI },
};
