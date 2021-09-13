import React, { Ref, useCallback, useState } from "react";
import styled from "styled-components";
import { disableSelectionCss } from "../../util/DOM";
import { Themed } from "../../themes/types";
import { Input } from "../Input";
import { TokenLogo } from "../TokenLogo";
import { BN, Currency } from "@unifiprotocol/utils";
import { PrimaryButton } from "../Button";
import { MdSearch } from "react-icons/md";
import { Theme } from "react-select";

const TokenInputWrapper = styled.div<Themed>`
  background: ${(p) => p.theme.bg200};
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 0.6rem;
`;

const Label = styled.div`
  margin-left: 0.5rem;
  ${disableSelectionCss}
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  color: ${(p) => p.theme.txt200};
`;

const Balance = styled.div``;

const AmountAndToken = styled.div`
  display: flex;
`;

const TokenAndSymbol = styled.div<Themed & { clickable: boolean }>`
  border-radius: ${(props) => props.theme.borderRadius};
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(p) => (p.clickable ? "pointer" : "default")};
  padding: 0.5rem;
  &:hover {
    background: ${(p) => (p.clickable ? p.theme.bg300 : "transparent")};
  }

  img {
    width: 1.5rem;
    height: auto;
    margin-right: 0.5rem;
  }
`;
const TokenSymbol = styled.div``;

export type TokenInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  balance: string;
  amount: string;
  token?: Currency;
  maxPercentage?: string;
  disableTokenChange?: boolean;
  onRequestChangeToken?: () => void;
};

export const TokenInput: React.FC<TokenInputProps> = ({
  token,
  amount: _amount,
  label,
  balance,
  maxPercentage = "0.99",
  disableTokenChange: tokenChangeEnabled = true,
  onRequestChangeToken,
}) => {
  const [amount, setAmount] = useState(_amount);

  const max = useCallback(() => {
    setAmount(BN(balance).multipliedBy(maxPercentage).toFixed());
  }, [setAmount]);

  return (
    <TokenInputWrapper onClick={focus}>
      <Head>
        <Label>{label}</Label>
        <Balance>Balance: {balance}</Balance>
      </Head>
      <AmountAndToken>
        <Input
          onChange={(evt) => setAmount(evt.target.value)}
          value={amount}
          actions={[{ label: "MAX", action: max }]}
        />
        {token && (
          <TokenAndSymbol
            clickable={tokenChangeEnabled}
            onClick={() =>
              tokenChangeEnabled &&
              onRequestChangeToken &&
              onRequestChangeToken()
            }
          >
            <TokenLogo token={token} />
            <TokenSymbol>{token.symbol}</TokenSymbol>
          </TokenAndSymbol>
        )}
        {!token && tokenChangeEnabled && (
          <PrimaryButton
            onClick={() => onRequestChangeToken && onRequestChangeToken()}
          >
            <MdSearch size={20} />
            Select
          </PrimaryButton>
        )}
      </AmountAndToken>
    </TokenInputWrapper>
  );
};
