import React, { useEffect, useState } from "react";
import { TokenList, TokenListItem } from ".";
import { Tokens } from "../../__mocks__/token.mock";
import { shortAddress } from "@unifiprotocol/utils";
import { Card, CardBody, CardHeader } from "../Card";
import { TokenOfficialBadge } from "../TokenBadges";
import styled from "styled-components";

export default {
  title: 'Components/TokenList'
}

const tokenListItems: TokenListItem[] = Tokens.map((currency) => ({
  currency,
}));

const tokenListItemsWithBalances = tokenListItems.map((t) => ({
  ...t,
  balance: `${Math.random() * 100}`,
}));

const OtherBadgeWrapper = styled.span`
  line-height: 0;
  font-size: 85%;
`;

const OtherBadge: React.FC = () => <OtherBadgeWrapper>🔥</OtherBadgeWrapper>;

const tokenListItemsWithBadges = tokenListItemsWithBalances.map((t, i) => {
  const badges = [];
  if (i < 6) {
    badges.push(<TokenOfficialBadge />);
  }
  if (i < 3) {
    badges.push(<OtherBadge />);
  }
  return {
    ...t,
    badges,
  };
});

export const Basic = () => (
    <TokenList tokenList={tokenListItems} onTokenSelected={() => {}} />
  )
  export const WithBalances = ()=>(
    <TokenList
      tokenList={tokenListItemsWithBalances}
      onTokenSelected={() => {}}
    />
  )
  export const = WithBadges () => (
    <TokenList
      tokenList={tokenListItemsWithBadges}
      onTokenSelected={() => {}}
    />
  )
  export const DisabledSearch= () => (
    <TokenList
      disableSearch={true}
      tokenList={tokenListItemsWithBadges}
      onTokenSelected={() => {}}
    />
  )
  export const CardWithSearch = ()=>{
    const [token, setToken] = useState(undefined);
    const [searchString, setSearchString] = useState(undefined);
    const [filteredTokenList, setFilteredTokenList] = useState(tokenListItems);
    useEffect(() => {
      setFilteredTokenList(
        tokenListItems.filter(({ currency }) => {
          const regExp = new RegExp(searchString, "i");
          const matchSymbol = regExp.test(currency.symbol);
          const matchName = regExp.test(currency.name);
          const matchAddress = regExp.test(currency.address);
          return matchSymbol || matchName || matchAddress;
        })
      );
    }, [searchString]);
    return (
      <>
        <h1>Tokens</h1>
        <div>
          <b>Selected token:</b>{" "}
          {token && (
            <>
              {token.symbol} @{shortAddress(token.address)}
            </>
          )}{" "}
          {!token && "None"}
        </div>
        <div>
          <b>Search string:</b> {searchString}
        </div>
        <Card>
          <CardHeader>Token list</CardHeader>
          <CardBody>
            <TokenList
              tokenList={filteredTokenList}
              onSearch={setSearchString}
              onTokenSelected={setToken}
            />
          </CardBody>
        </Card>
      </>
    );
  };
