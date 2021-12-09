import React, { useCallback, useState } from "react";
import { TokenListItem } from "../../components/TokenList";
import { Tokens } from "../../__mocks__/token.mock";
import { TokenInputWithSelector } from ".";
import { Currency } from "@unifiprotocol/utils";
import { Card, CardBody, CardHeader } from "../../components/Card";
import { MessageAlert } from "../../components/Alert";
import { TokenOfficialBadge } from '../../components/TokenBadges';

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

const tokenListItemsWithBadges = tokenListItems.map((t, i) => ({
  ...t,
  balance: `${Math.random() * 100}`,
  badges: (i % 2 == 0) ? [<TokenOfficialBadge key={0}/>] : [],
}));

export const Default = () => {
  const [amount, setAmount] = useState("0");
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
      if (query === "") {
        setTokenList(tokenListItemsWithBalances);
        return;
      }
      const re = new RegExp(query, "i");
      const newTokenList = tokenListItemsWithBalances.filter((token) => {
        return (
          token.currency.symbol.match(re) ||
          token.currency.address.match(re) ||
          token.currency.name.match(re)
        );
      });
      setTokenList(newTokenList);
    },
    [setTokenList]
  );

  return (
    <>
      <h1>Token Input with Modal Selector</h1>
      <Card>
        <CardHeader>
          <h2>Select a token</h2>
        </CardHeader>
        <CardBody>
          <MessageAlert variant="fill">
            You have introduced {amount} of {token ? token.symbol : "Nothing"}
          </MessageAlert>
          <TokenInputWithSelector
            label="Desired token"
            token={token}
            balance={balance}
            balanceLoading={balanceLoading}
            balanceLabel="Balance"
            tokenList={tokenList}
            onTokenChange={onTokenChange}
            onSearch={onSearch}
            amount={amount}
            onAmountChange={setAmount}
          />
        </CardBody>
      </Card>
    </>
  );
};

export const WithBadges = () => {
  const [amount, setAmount] = useState("0");
  const [tokenList, setTokenList] = useState(tokenListItemsWithBadges);
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
      if (query === "") {
        setTokenList(tokenListItemsWithBadges);
        return;
      }
      const re = new RegExp(query, "i");
      const newTokenList = tokenListItemsWithBadges.filter((token) => {
        return (
          token.currency.symbol.match(re) ||
          token.currency.address.match(re) ||
          token.currency.name.match(re)
        );
      });
      setTokenList(newTokenList);
    },
    [setTokenList]
  );

  return (
    <>
      <h1>Token Input with Modal Selector</h1>
      <Card>
        <CardHeader>
          <h2>Select a token</h2>
        </CardHeader>
        <CardBody>
          <MessageAlert variant="fill">
            You have introduced {amount} of {token ? token.symbol : "Nothing"}
          </MessageAlert>
          <TokenInputWithSelector
            label="Desired token"
            token={token}
            balance={balance}
            balanceLoading={balanceLoading}
            balanceLabel="Balance"
            tokenList={tokenList}
            onTokenChange={onTokenChange}
            onSearch={onSearch}
            amount={amount}
            onAmountChange={setAmount}
          />
        </CardBody>
      </Card>
    </>
  );
};