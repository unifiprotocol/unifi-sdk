import { WalletConnectors } from "@unifiprotocol/core-sdk";
import metamask from "../Assets/Wallets/Metamask.png";
import binancesmartchain from "../Assets/Wallets/BinanceSmartChain.png";
import mathwallet from "../Assets/Wallets/Mathwallet.png";
import trustwallet from "../Assets/Wallets/TrustWallet.svg";
import harmonyOneWallet from "../Assets/Wallets/HarmonyOneWallet.png";
import web3 from "../Assets/Wallets/Web3.png";
import OntoWallet from "../Assets/Wallets/OntoWallet.png";
import TronLink from "../Assets/Wallets/TronLink.jpeg";
import WalletConnect from "../Assets/Wallets/WalletConnect.png";
import CoinbaseWalletLogo from "../Assets/Wallets/CoinbaseWalletLogo.png";

export const getWalletIcon = (wallet: string) => {
  return {
    [WalletConnectors.Metamask]: metamask,
    [WalletConnectors.Binance]: binancesmartchain,
    [WalletConnectors.MathWallet]: mathwallet,
    [WalletConnectors.TrustWallet]: trustwallet,
    [WalletConnectors.MetamaskCompatible]: web3,
    [WalletConnectors.HarmonyOneWallet]: harmonyOneWallet,
    [WalletConnectors.OntoWallet]: OntoWallet,
    [WalletConnectors.TronLink]: TronLink,
    [WalletConnectors.CoinbaseWallet]: CoinbaseWalletLogo,
    [WalletConnectors.WalletConnect]: WalletConnect,
  }[wallet];
};
