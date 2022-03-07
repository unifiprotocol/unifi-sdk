import { Currency } from "@unifiprotocol/utils";

export const BTTCNativeToken = new Currency("BTT", 18, "BTT", "BTT");

export const BTTCWrappedToken = new Currency(
  "0x8D193c6efa90BCFf940A98785d1Ce9D093d3DC8A",
  18,
  "WBTT",
  "Wrapped BitTorrent"
);

export const BTTCUpToken = new Currency(
  "0x2220c7cD9946b9c03f0BDBbD24fa4df76E7C63e7",
  18,
  "UP",
  "UP"
);
