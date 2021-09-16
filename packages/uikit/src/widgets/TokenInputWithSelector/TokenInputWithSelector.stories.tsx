import React, { useCallback, useEffect, useState } from "react";
import { TokenListItem } from "../../components/TokenList";
import { Tokens } from "../../__mocks__/token.mock";
import { TokenInputWithSelector } from ".";
import { Currency } from "@unifiprotocol/utils";
export default {
  title: "Widgets/TokenInputWithSelector",
  argTypes: {},
};

const tokenListItems: TokenListItem[] = Tokens.map((currency) => ({
  currency,
}));
const tokenListItemsWithBalances = tokenListItems.map((t) => ({
  ...t,
  balance: `${Math.random() * 100}`,
}));

export const Default = () => {
  const [tokenList, setTokenList] = useState(tokenListItemsWithBalances);
  const [token, setToken] = useState<Currency | undefined>(undefined);
  const [balance, setBalance] = useState("0");
  const [balanceLoading, setBalanceLoading] = useState(false);

  const onTokenChange = useCallback((token: Currency) => {
    setToken(token);
    setBalanceLoading(true);
    setTimeout(() => {
      setBalance(`${Math.random() * 100}`);
      setBalanceLoading(false);
    }, 1000);
  }, []);

  const onSearch = useCallback(
    (query: string) => {
      const newTokenList = tokenListItemsWithBalances.filter((token) => {
        return query === token.currency.symbol;
      });
      setTokenList(newTokenList);
    },
    [setTokenList]
  );

  return (
    <>
      <h1>Modals</h1>
      <TokenInputWithSelector
        label="Desired token"
        token={token}
        balance={balance}
        balanceLoading={balanceLoading}
        tokenList={tokenList}
        onTokenChange={onTokenChange}
        onSearch={onSearch}
      />
    </>
  );
};
