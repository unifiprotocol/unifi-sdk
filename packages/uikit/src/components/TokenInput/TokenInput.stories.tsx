import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { TokenInput, TokenInputProps } from ".";
import { Currency } from "@unifiprotocol/utils";

const _token = new Currency(
  "0x728c5bac3c3e370e372fc4671f9ef6916b814d8b",
  18,
  "UNFI",
  "UNFI",
  ""
);

const ShowDemo = (props: Omit<TokenInputProps, "onChange">) => () => {
  const [state, setState] = useState<TokenInputProps["value"]>(props.value);
  const [token, setToken] = useState<Currency | undefined>(props.token);
  return (
    <div style={{ width: "21rem" }}>
      <h1>Token Input</h1>
      <TokenInput
        {...props}
        token={token}
        onRequestChangeToken={() => setToken(_token)}
        onChange={(evt) => setState(evt.target.value)}
        value={state}
      />
    </div>
  );
};
storiesOf("TokenInput", module)
  .add(
    "Token selected",
    ShowDemo({ token: _token, amount: "10", balance: "100", label: "From" })
  )
  .add(
    "Token not selected",
    ShowDemo({ amount: "10", balance: "100", label: "From" })
  );
