import { Blockchains } from "@unifiprotocol/core-sdk";
import { Currency } from "@unifiprotocol/utils";

export interface IConfig {
  blockchain: Blockchains;
  logoURI: string;
  chainId: number;
  nativeToken: Currency;
  wrappedToken: Currency;
}

const config: IConfig[] = [
  {
    blockchain: Blockchains.Binance,
    chainId: 56,
    logoURI:
      "https://cloudflare-ipfs.com/ipfs/QmU2EACvQ1YT7LTzHQdQEVMwDYVeeX3AHBHT9q5HQ4e5oK",
    nativeToken: new Currency("BNB", 18, "BNB", "BNB"),
    wrappedToken: new Currency(
      "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      18,
      "WBNB",
      "WBNB"
    ),
  },
  {
    blockchain: Blockchains.EthereumRopsten,
    chainId: 3,
    logoURI:
      "https://cloudflare-ipfs.com/ipfs/QmXaeURdHVszjDuGCwM7DauTjaASfm8qBZYzETM5ehq7MD",
    nativeToken: new Currency("ETH", 18, "ETH", "ETH"),
    wrappedToken: new Currency(
      "0x81aD5fbAa4ec85Ca6F9C97861522D8491fB4F77F",
      18,
      "WETH",
      "WETH"
    ),
  },
  {
    blockchain: Blockchains.BinanceTestnet,
    chainId: 97,
    logoURI:
      "https://cloudflare-ipfs.com/ipfs/QmU2EACvQ1YT7LTzHQdQEVMwDYVeeX3AHBHT9q5HQ4e5oK",
    nativeToken: new Currency("BNB", 18, "BNB", "Binance"),
    wrappedToken: new Currency(
      "0xC578c6e2505Fd2B227A64350ABf85e7221D17c91",
      18,
      "WBNB",
      "Wrapped BNB"
    ),
  },
];

export default config;
