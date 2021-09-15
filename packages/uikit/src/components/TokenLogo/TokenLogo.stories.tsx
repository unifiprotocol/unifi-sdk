import React from "react";
import { TokenLogo } from ".";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

export default {
  title: "Components/Tokens/TokenLogo",
};

export const Default = () => (
  <>
    <h1>TokenLogo</h1>
    <TokenLogo token={UNFI_TOKEN} />
  </>
);
