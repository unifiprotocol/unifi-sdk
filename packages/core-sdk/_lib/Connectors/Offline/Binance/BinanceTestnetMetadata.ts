import { ConnectorMetadata } from "../../../Entities/ConnectorMetadata";
import { OfflineConnectors } from "../../../Types";

export class BinanceTestnetMetadata extends ConnectorMetadata {
  constructor() {
    super(OfflineConnectors.BinanceTestnet, "BscDataSeed", false, "", "");
  }
}

export const binanceTestnetMetadata = new BinanceTestnetMetadata();
