import React, { useState } from "react";
import { PrimaryButton } from "../../components/Button";
import { useModal } from "../modal";
import { TokenListModal, TokenListModalProps } from ".";
import { TokenListItem } from "../../components/TokenList";
import { Tokens } from "../../__mocks__/token.mock";
import { Currency, shortAddress } from "@unifiprotocol/utils";

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

export const Default = () => {
  const [token, setToken] = useState<Currency | undefined>(undefined);

  const [open] = useModal<TokenListModalProps>({
    component: TokenListModal,
    props: {
      tokenList: tokenListItemsWithBalances,
      onTokenSelected: setToken,
    },
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
