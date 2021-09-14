import React from "react";
import { storiesOf } from "@storybook/react";
import { TokenAmount } from ".";
import { Currency } from "@unifiprotocol/utils";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

storiesOf("TokenAmount", module).add("TokenAmount", () => (
  <>
    <h1>TokenAmount</h1>
    <TokenAmount amount={"10"} token={UNFI_TOKEN} />
  </>
));
