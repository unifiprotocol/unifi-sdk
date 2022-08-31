import { Blockchains } from "./Enums/";

class ScanExplorer {
  constructor(
    public readonly baseUrl: string,
    private options: {
      txPath?: string;
      addressPath?: string;
      tokenPath?: string;
    } = {}
  ) {
    this.options = {
      txPath: "tx",
      tokenPath: "token",
      addressPath: "address",
    };
  }
  tx(hash: string): string {
    return `${this.baseUrl}/${this.options.txPath}/${hash}`;
  }
  token(address: string): string {
    return `${this.baseUrl}/${this.options.tokenPath}/${address}`;
  }
  address(address: string): string {
    return `${this.baseUrl}/${this.options.addressPath}/${address}`;
  }
}

export const ScanExplorers: Record<string, ScanExplorer> = {
  BscScan: new ScanExplorer("https://bscscan.com"),
  BscScanTestnet: new ScanExplorer("https://testnet.bscscan.com"),
  EtherScan: new ScanExplorer("https://etherscan.io"),
  HarmonyExplorer: new ScanExplorer("https://explorer.harmony.one", {
    tokenPath: "address",
  }),
  IotexScan: new ScanExplorer("https://iotexscan.io", { txPath: "action" }),
  PolygonScan: new ScanExplorer("https://polygonscan.com"),
  RinkebyScan: new ScanExplorer("https://rinkeby.etherscan.io/"),
  GoerliScan: new ScanExplorer("https://goerli.etherscan.io/"),
  FtmScan: new ScanExplorer("https://ftmscan.com"),
  BttcScan: new ScanExplorer("https://bttcscan.com/"),
  OntologyTestnetExplorer: new ScanExplorer("https://explorer.ont.io/testnet/"),
  OntologyExplorer: new ScanExplorer("https://explorer.ont.io/"),
  AvalancheST: new ScanExplorer("https://snowtrace.io/"),
  TronScan: new ScanExplorer("https://tronscan.org/#/", {
    txPath: "transaction",
    tokenPath: "token20",
  }),
};

export const BlockchainScanExplorers: {
  [B in Blockchains]: ScanExplorer;
} = {
  [Blockchains.Binance]: ScanExplorers["BscScan"],
  [Blockchains.BinanceTestnet]: ScanExplorers["BscScanTestnet"],
  [Blockchains.Ethereum]: ScanExplorers["EtherScan"],
  [Blockchains.Harmony]: ScanExplorers["HarmonyExplorer"],
  [Blockchains.Iotex]: ScanExplorers["IotexScab"],
  [Blockchains.Polygon]: ScanExplorers["PolygonScan"],
  [Blockchains.EthereumGoerli]: ScanExplorers["GoerliScan"],
  [Blockchains.FTM]: ScanExplorers["FtmScan"],
  [Blockchains.EthereumRinkeby]: ScanExplorers["RinkebyScan"],
  [Blockchains.BTTC]: ScanExplorers["BttcScan"],
  [Blockchains.OntologyTestnet]: ScanExplorers["OntologyTestnetExplorer"],
  [Blockchains.Ontology]: ScanExplorers["OntologyExplorer"],
  [Blockchains.Avalanche]: ScanExplorers["AvalancheST"],
  [Blockchains.Tron]: ScanExplorers["TronScan"],
};
