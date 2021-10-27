import { useModal } from "../modal";
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

  useEffect(() => {
    setToken(tokenInputProps.token);
  }, [tokenInputProps.token]);

  const onTokenSelected = useCallback(
    (token: Currency) => {
      setToken(token);
      onTokenChange(token);
    },
    [onTokenChange]
  );

  const props = useMemo(
    () => ({
      tokenList,
      onTokenSelected,
      onSearch,
    }),
    [tokenList, onTokenSelected, onSearch]
  );

  const [open] = useModal({
    component: TokenListModal,
    props,
    options: { disableBackdropClick: true },
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
