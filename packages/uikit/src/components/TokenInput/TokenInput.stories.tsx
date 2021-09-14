import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { TokenInput, TokenInputProps } from ".";
import { Currency } from "@unifiprotocol/utils";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

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
storiesOf("TokenInput", module)
  .add(
    "Token selected",
    ShowDemo({ token: UNFI_TOKEN, amount: "10", balance: "100", label: "From" })
  )
  .add(
    "Token not selected",
    ShowDemo({ amount: "10", balance: "100", label: "From" })
  );
