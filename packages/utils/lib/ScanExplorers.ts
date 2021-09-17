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
  EtherScan: new ScanExplorer("http://etherscan.io"),
  HarmonyExplorer: new ScanExplorer("https://explorer.harmony.one", {
    tokenPath: "address",
  }),
  IotexScan: new ScanExplorer("https://iotexscan.io", { txPath: "action" }),
  PolygonScan: new ScanExplorer("https://polygonscan.com"),
  RopstenScan: new ScanExplorer("http://ropsten.etherscan.io"),
};
