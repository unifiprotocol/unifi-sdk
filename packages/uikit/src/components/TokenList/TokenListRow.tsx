import { BN, Currency, shortAddress } from "@unifiprotocol/utils";
import React, { useContext, useMemo } from "react";
import { UiContext } from "../../context/uiContext";
import { TokenLogo } from "../TokenLogo";

import {
  TokenListRowWrapper,
  TokenLabel,
  TokenName,
  TokenSymbol,
  TokenContract,
  TokenBadges,
  TokenSymbolAndBadges,
} from "./Styles";

export const TokenListRow: React.FC<{
  currency: Currency;
  balance?: string;
  badges?: React.ReactNode[];
  onClick: () => void;
}> = ({ currency, badges = [], onClick, balance: _balance }) => {
  const { tokenLink, isNativeToken } = useContext(UiContext);
  const balance = useMemo(() => _balance && BN(_balance).toFixed(4), [
    _balance,
  ]);
  return (
    <TokenListRowWrapper onClick={onClick}>
      <div>
        <TokenLogo token={currency} />
        <TokenLabel>
          <TokenSymbolAndBadges>
            <TokenSymbol>{currency.symbol}</TokenSymbol>
            {badges && <TokenBadges>{badges.map((b) => b)}</TokenBadges>}
          </TokenSymbolAndBadges>
          <TokenName>{currency.name}</TokenName>
          {isNativeToken && tokenLink && !isNativeToken(currency) && (
            <TokenContract
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              href={tokenLink(currency.address)}
            >
              {shortAddress(currency.address)}
            </TokenContract>
          )}
        </TokenLabel>
      </div>
      {balance && <div>{balance}</div>}
    </TokenListRowWrapper>
  );
};
