import { PrettyAmount } from "../PrettyAmount";
import { Currency } from "@unifiprotocol/utils";
import React from "react";
import styled from "styled-components";
import { calcClassName } from "../../util/DOM";
import { TokenLogo } from "../TokenLogo";

const TokenAmountWrapper = styled.div`
  display: flex;
  background: ${(props) => props.theme.bg200};
  border-radius: ${(props) => props.theme.borderRadius};
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
}

export const TokenAmount: React.FC<TokenAmountProps> = ({
  token,
  amount,
  compactOnXs = false,
}) => {
  return (
    <TokenAmountWrapper className={calcClassName({ compactOnXs })}>
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
