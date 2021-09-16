import { useModal } from "../modal";
import { TokenListItem } from "../../components/TokenList";
import { TokenListModal, TokenListModalProps } from "../TokenListModal";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Currency } from "@unifiprotocol/utils";
import { TokenInput, TokenInputProps } from "../../components/TokenInput";

type PropsFromInput = Omit<TokenInputProps, "onRequestChangeToken">;
type PropsFromTokenList = Pick<TokenListModalProps, "tokenList" | "onSearch">;
type TokenInputWithSelectorProps = PropsFromInput &
  PropsFromTokenList & {
    onTokenChange: (token: Currency) => void;
  };

export const TokenInputWithSelector: React.FC<TokenInputWithSelectorProps> = ({
  tokenList,
  onTokenChange,
  onSearch,
  ...tokenInputProps
}) => {
  const [token, setToken] = useState<Currency | undefined>(
    tokenInputProps.token
  );

  const onTokenSelected = useCallback(
    (token: Currency) => {
      setToken(token);
      onTokenChange(token);
    },
    [onTokenChange]
  );

  const [open] = useModal({
    component: TokenListModal,
    props: {
      tokenList,
      onTokenSelected,
      onSearch,
    },
  });

  return (
    <>
      <TokenInput
        {...tokenInputProps}
        onRequestChangeToken={open}
        token={token}
      />
    </>
  );
};
