import React, { useEffect, useState } from "react";
import {
  TokenListWrapper,
  TokenListRowsWrapper,
  LoadingTokens,
} from "./Styles";
import { TokenListRow } from "./TokenListRow";
import { BiSearch } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { Currency } from "@unifiprotocol/utils";
import { Input } from "../Input";
import { IconAddon } from "../Input/Styles";

export interface TokenListItem {
  currency: Currency;
  balance?: string;
  badges?: React.ReactNode[];
}
interface TokenListProps {
  tokenList: Array<TokenListItem>;
  onTokenSelected: (currency: Currency) => void;
  searchPlaceholderTxt?: string;
  onSearch?: (searchString: string) => void;
  disableSearch?: boolean;
  loadingTokens?: boolean;
  loadingTokensTxt?: string;
}
export const TokenList: React.FC<TokenListProps> = ({
  tokenList,
  loadingTokens = false,
  onTokenSelected,
  onSearch,
  searchPlaceholderTxt = "",
  loadingTokensTxt = "",
  disableSearch = false,
}) => {
  const [searchString, setSearchString] = useState("");
  useEffect(() => onSearch && onSearch(searchString), [searchString]);
  const searchInputActions =
    searchString.length > 0
      ? [{ label: "Clear", action: () => setSearchString("") }]
      : [];
  return (
    <TokenListWrapper>
      {!disableSearch && (
        <Input
          prefixAddon={
            <IconAddon>
              <BiSearch size={23} />
            </IconAddon>
          }
          placeholder={searchPlaceholderTxt}
          value={searchString}
          onChange={(evt) => setSearchString(evt.currentTarget.value.trim())}
          actions={searchInputActions}
        />
      )}

      <TokenListRowsWrapper>
        {loadingTokens && (
          <LoadingTokens>
            <CgSpinner className="spin" /> {loadingTokensTxt}
          </LoadingTokens>
        )}
        {tokenList.map(({ currency, badges, balance }) => (
          <TokenListRow
            key={`tokenRow-${currency.address}`}
            onClick={() => onTokenSelected(currency)}
            badges={badges}
            balance={balance}
            currency={currency}
          />
        ))}
      </TokenListRowsWrapper>
    </TokenListWrapper>
  );
};
