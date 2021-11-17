import React, { useCallback } from "react";
import styled from "styled-components";
import { disableSelectionCss } from "../../util/DOM";
import { Themed } from "../../themes";
import { Input } from "../Input";
import { TokenLogo } from "../TokenLogo";
import { BN, Currency } from "@unifiprotocol/utils";
import { PrimaryButton } from "../Button";
import { MdSearch } from "react-icons/md";
import { ShinyWrapper } from "../ShinyWrapper";
import { PrettyAmount } from "../PrettyAmount";
import { CgSpinner } from "react-icons/cg";
import { Spin } from "../Animations";

const TokenInputWrapper = styled.div<Themed>`
  background: ${(p) => p.theme.bgInput};
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 0.6rem;
  transition: 0.25s all;
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
  color: ${(p) => p.theme.txt200};
`;

const Balance = styled.div``;

const AmountAndToken = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  justify-content: space-between;
`;

const Token = styled.div<Themed & { clickable: boolean }>`
  border-radius: ${(props) => props.theme.borderRadius};
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(p) => (p.clickable ? "pointer" : "default")};
  padding: 0.5rem;
  &:hover {
    background: ${(p) => (p.clickable ? p.theme.bgAlt2 : "transparent")};
  }

  img {
    width: 1.5rem;
    height: auto;
    margin-right: 0.5rem;
  }
`;
const TokenSymbol = styled.div``;
const Amount = styled.div`
  flex-grow: 1;
`;

export type TokenInputProps = {
  label: React.ReactNode;
  balance?: string;
  balanceLoading?: boolean;
  balanceLabel: string;
  amount?: string;
  token?: Currency;
  maxPercentage?: string;
  disableTokenChange?: boolean;
  onRequestChangeToken?: () => void;
  onAmountChange: (amount: string) => void;
};

export const TokenInput: React.FC<TokenInputProps> = ({
  token,
  amount = "0",
  label,
  maxPercentage = "0.99",
  balance = "0",
  balanceLoading = false,
  balanceLabel,
  disableTokenChange = false,
  onRequestChangeToken,
  onAmountChange,
}) => {
  const tokenChangeEnabled = !disableTokenChange;
  const max = useCallback(() => {
    onAmountChange(BN(balance).multipliedBy(maxPercentage).toFixed());
  }, [onAmountChange, balance]);

  return (
    <ShinyWrapper mode="on-focus-within">
      <TokenInputWrapper>
        <Head>
          <Label>{label}</Label>
          {balance && (
            <Balance>
              {balanceLoading && (
                <Spin>
                  <CgSpinner />
                </Spin>
              )}{" "}
              {balanceLabel}{" "}
              <PrettyAmount value={balance} animationDuration={500} />
            </Balance>
          )}
        </Head>
        <AmountAndToken>
          <Amount>
            <Input
              disableFocusEffect={true}
              onChange={(evt) => onAmountChange(evt.target.value)}
              value={amount}
              actions={[{ label: "MAX", action: max }]}
            />
          </Amount>
          {token && (
            <Token
              clickable={tokenChangeEnabled}
              onClick={() =>
                tokenChangeEnabled &&
                onRequestChangeToken &&
                onRequestChangeToken()
              }
            >
              <TokenLogo token={token} />
              <TokenSymbol>{token.symbol}</TokenSymbol>
            </Token>
          )}
          {!token && tokenChangeEnabled && (
            <div>
              <PrimaryButton
                onClick={() => onRequestChangeToken && onRequestChangeToken()}
              >
                <MdSearch size={20} />
                Select
              </PrimaryButton>
            </div>
          )}
        </AmountAndToken>
      </TokenInputWrapper>
    </ShinyWrapper>
  );
};
