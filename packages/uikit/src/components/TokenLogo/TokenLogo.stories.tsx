import React from "react";
import { storiesOf } from "@storybook/react";
import { TokenLogo } from ".";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

storiesOf("TokenLogo", module).add("TokenLogo", () => (
  <>
    <h1>TokenLogo</h1>
    <TokenLogo token={UNFI_TOKEN} />
  </>
));
