import { PrettyAmount } from "../PrettyAmount";
import { Currency } from "@unifiprotocol/utils";
import React from "react";
import styled from "styled-components";
import { calcClassName } from "../../util/DOM";
import { TokenLogo } from "../TokenLogo";
import { kfShine } from "../../keyframes";

const TokenAmountWrapper = styled.div<{ shiny: boolean }>`
  display: flex;
  animation: ${kfShine} 3s linear infinite;
  background: ${(p) => p.theme.bgInput};
  ${(p) =>
    p.shiny &&
    `
    *{
      color: #000!important;
      font-weight:bold!important;
    }
    img {
      box-shadow: 0 0 0 2px #fff;
    }
background: ${p.theme.shinyGradient};
background-size: 200% auto;}
  `}

  border-radius: ${(p) => p.theme.borderRadius};
  padding: 0.5rem;
  align-items: center;
  .logo {
    width: 50px;
    height: 50px;
    padding: 0.5rem;
    img {
      height: 100%;
      width: auto;
      border-radius: 100%;
    }
  }
  .data {
    min-width: 0;
    text-align: left;
    .symbol {
      font-size: 80%;
      color: ${(p) => p.theme.txt200};
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .amount {
      font-size: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media (${(p) => p.theme.breakpoints.xs}) {
    &.compactOnXs {
      padding: 0.1rem;
      .logo {
        width: 30px;
        height: 30px;
        padding: 0.2rem;
        img {
          height: 100%;
          width: auto;
        }
      }
    }
  }
`;
interface TokenAmountProps {
  token: Currency;
  amount: string;
  compactOnXs?: boolean;
  shiny?: boolean;
}

export const TokenAmount: React.FC<TokenAmountProps> = ({
  token,
  amount,
  compactOnXs = false,
  shiny = false,
}) => {
  return (
    <TokenAmountWrapper
      shiny={shiny}
      className={calcClassName({ compactOnXs })}
    >
      <div className="logo">
        <TokenLogo token={token} />
      </div>
      <div className="data">
        <div className="amount">
          <PrettyAmount value={amount} />
        </div>
        <div className="symbol">{token.symbol}</div>
      </div>
    </TokenAmountWrapper>
  );
};
