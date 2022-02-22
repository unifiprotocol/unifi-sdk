import { BN } from "@unifiprotocol/utils";

type CoinGeckoCoinListResponse = Array<{
  id: string;
  symbol: string;
}>;

type CoinGeckoResponse = {
  [tokenId: string]: {
    usd: number;
  };
};
class CoinGeckoService {
  getUnfiPrice() {
    return this.getTokenPrice("unifi-protocol-dao");
  }

  async getCoinList(): Promise<CoinGeckoCoinListResponse> {
    try {
      return fetch(`https://api.coingecko.com/api/v3/coins/list`).then((res) =>
        res.json()
      );
    } catch (err) {
      return [];
    }
  }

  async getTokenPriceBySymbol(symbol: string): Promise<string> {
    const list = await this.getCoinList();

    const coins = list.filter(
      (token) => token.symbol.toLowerCase() === symbol.toLowerCase()
    );
    if (coins.length === 1) {
      return this.getTokenPrice(coins[0].id);
    }
    return "0";
  }

  async getTokenPrice(tokenId: string, factor: number = 1): Promise<string> {
    try {
      const res: CoinGeckoResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
      ).then((res) => res.json());
      const resValues = Object.values(res);
      if (resValues.length > 0) {
        const { usd } = resValues[0];
        return BN(usd).dividedBy(factor).toFixed();
      }
      return "0";
    } catch (err) {
      return "0";
    }
  }
}

export const coinGeckoService = new CoinGeckoService();
