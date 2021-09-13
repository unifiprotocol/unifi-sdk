import React from "react";
import { storiesOf } from "@storybook/react";
import { TokenAmount } from ".";
import { Currency } from "@unifiprotocol/utils";

const token = new Currency(
  "0x728c5bac3c3e370e372fc4671f9ef6916b814d8b",
  18,
  "UNFI",
  "UNFI",
  ""
);

storiesOf("TokenAmount", module).add("TokenAmount", () => (
  <>
    <h1>TokenAmount</h1>
    <TokenAmount amount={"10"} token={token} />
  </>
));
