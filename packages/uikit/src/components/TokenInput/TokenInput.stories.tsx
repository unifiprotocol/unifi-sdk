import React, { useState } from "react";
import { TokenInput, TokenInputProps } from ".";
import { Currency } from "@unifiprotocol/utils";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

export default {
  title: "Components/Tokens/TokenInput",
};

const ShowDemo = (props: Omit<TokenInputProps, "onAmountChange">) => () => {
  const [state, setState] = useState<TokenInputProps["amount"]>(props.amount);
  const [token, setToken] = useState<Currency | undefined>(props.token);
  return (
    <div style={{ width: "21rem" }}>
      <h1>Token Input</h1>
      <TokenInput
        {...props}
        token={token}
        onRequestChangeToken={() => setToken(UNFI_TOKEN)}
        onAmountChange={(amount) => setState(amount)}
        amount={state}
      />
    </div>
  );
};
export const TokenSelected = ShowDemo({
  token: UNFI_TOKEN,
  amount: "10",
  balance: "100",
  label: "From",
  balanceLabel: "Balance",
});
export const TokenNotSelected = ShowDemo({
  amount: "10",
  balance: "100",
  label: "From",
  balanceLabel: "Balance",
});
