import React from "react";
import { storiesOf } from "@storybook/react";
import { TokenLogo } from ".";
import { Currency } from "@unifiprotocol/utils";

const token = new Currency(
  "0x728c5bac3c3e370e372fc4671f9ef6916b814d8b",
  18,
  "UNFI",
  "UNFI",
  ""
);

storiesOf("TokenLogo", module).add("TokenLogo", () => (
  <>
    <h1>TokenLogo</h1>
    <TokenLogo token={token} />
  </>
));
