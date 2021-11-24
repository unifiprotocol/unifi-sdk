import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class BinanceMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.Binance, "BscDataSeed", false, "", "");
  }
}

export const binanceMetadata = new BinanceMetadata();
