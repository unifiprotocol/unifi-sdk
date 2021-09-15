import React, { useState } from "react";
import { TokenInput, TokenInputProps } from ".";
import { Currency } from "@unifiprotocol/utils";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

export default {
  title: "Components/TokenInput",
};

const ShowDemo = (props: Omit<TokenInputProps, "onChange">) => () => {
  const [state, setState] = useState<TokenInputProps["value"]>(props.value);
  const [token, setToken] = useState<Currency | undefined>(props.token);
  return (
    <div style={{ width: "21rem" }}>
      <h1>Token Input</h1>
      <TokenInput
        {...props}
        token={token}
        onRequestChangeToken={() => setToken(UNFI_TOKEN)}
        onChange={(evt) => setState(evt.target.value)}
        value={state}
      />
    </div>
  );
};
export const TokenSelected = ShowDemo({
  token: UNFI_TOKEN,
  amount: "10",
  balance: "100",
  label: "From",
});
export const TokenNotSelected = ShowDemo({
  amount: "10",
  balance: "100",
  label: "From",
});
