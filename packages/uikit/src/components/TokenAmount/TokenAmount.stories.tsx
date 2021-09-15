import React from "react";
import { TokenAmount } from ".";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

export default {
  title: "Components/TokenAmount",
};

export const Default = () => (
  <>
    <h1>TokenAmount</h1>
    <TokenAmount amount={"10"} token={UNFI_TOKEN} />
  </>
);

export const Shiny = () => (
  <>
    <h1>TokenAmount</h1>
    <TokenAmount shiny={true} amount={"10"} token={UNFI_TOKEN} />
  </>
);
