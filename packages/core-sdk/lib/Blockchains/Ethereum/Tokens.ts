import { Currency } from "@unifiprotocol/utils";

export const ETHNativeToken = new Currency("ETH", 18, "ETH", "Ethereum");

export const ETHWrappedToken = new Currency(
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18,
  "WETH",
  "WETH"
);

export const ETHUpToken = new Currency(
  "0xb6c5C839ceF46082A2B51164E8Db649c121f147E",
  18,
  "UP",
  "UP"
);

export const ETHUnfiToken = new Currency(
  "0x441761326490cacf7af299725b6292597ee822c2",
  18,
  "UNFI",
  "UNFI"
);
