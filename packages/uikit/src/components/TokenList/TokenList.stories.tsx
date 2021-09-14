import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { TokenList, TokenListItem } from ".";

import { shortAddress } from "@unifiprotocol/utils";
import { Card, CardBody, CardHeader } from "../Card";
import { TokenOfficialBadge } from "../TokenBadges";
import styled from "styled-components";
const tokenListItems: TokenListItem[] = [].map((currency) => ({
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

storiesOf("TokenList", module)
  .add("Basic", () => (
    <TokenList tokenList={tokenListItems} onTokenSelected={() => {}} />
  ))
  .add("With Balances", () => (
    <TokenList
      tokenList={tokenListItemsWithBalances}
      onTokenSelected={() => {}}
    />
  ))
  .add("WithBadges", () => (
    <TokenList
      tokenList={tokenListItemsWithBadges}
      onTokenSelected={() => {}}
    />
  ))
  .add("Card", () => {
    const [token, setToken] = useState(undefined);
    const [searchString, setSearchString] = useState(undefined);
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
              tokenList={tokenListItems}
              onSearch={setSearchString}
              onTokenSelected={setToken}
            />
          </CardBody>
        </Card>
      </>
    );
  });
