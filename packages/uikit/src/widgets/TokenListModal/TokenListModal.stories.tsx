import React, { useMemo, useState } from "react";
import { PrimaryButton } from "../../components/Button";
import { useModal } from "../modal";
import { TokenListModal, TokenListModalProps } from ".";
import { TokenListItem } from "../../components/TokenList";
import { Tokens } from "../../__mocks__/token.mock";
import { Currency, shortAddress } from "@unifiprotocol/utils";
import { TokenOfficialBadge } from '../../components/TokenBadges';

export default {
  title: "Widgets/TokenListModal",
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
  const [token, setToken] = useState<Currency | undefined>(undefined);
  const props = useMemo(
    () => ({
      tokenList: tokenListItemsWithBalances,
      onTokenSelected: setToken,
    }),
    []
  );
  const [open] = useModal<TokenListModalProps>({
    component: TokenListModal,
    props,
  });

  return (
    <>
      <h1>Modals</h1>

      <div>
        {!token && "Please, select a token."}
        {token && (
          <>
            Selected token: {token.symbol} @{shortAddress(token.address)}
          </>
        )}
      </div>
      <PrimaryButton onClick={open}>Open it</PrimaryButton>
    </>
  );
};

export const WithBadges = () => {
  const [token, setToken] = useState<Currency | undefined>(undefined);
  const props = useMemo(
    () => ({
      tokenList: tokenListItemsWithBadges,
      onTokenSelected: setToken,
    }),
    []
  );
  const [open] = useModal<TokenListModalProps>({
    component: TokenListModal,
    props,
  });

  return (
    <>
      <h1>Modals</h1>

      <div>
        {!token && "Please, select a token."}
        {token && (
          <>
            Selected token: {token.symbol} @{shortAddress(token.address)}
          </>
        )}
      </div>
      <PrimaryButton onClick={open}>Open it</PrimaryButton>
    </>
  );
};