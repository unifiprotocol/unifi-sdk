import React, { useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { UiResolverCtx } from "../../context/uiContext";
import { UNKNOWN_TOKEN_LOGO } from "../../util/images";

export const TokenLogoImg = styled.img`
  border-radius: 100%;
`;
type TokenData = { address: string; symbol: string; logoURI: string };

type TokenLogoProps = {
  token: TokenData;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const TokenLogo: React.FC<TokenLogoProps> = ({ token, ...imgProps }) => {
  const { tokenLogoResolver } = useContext(UiResolverCtx);
  const sources = useMemo(
    () =>
      [
        token.logoURI,
        tokenLogoResolver && tokenLogoResolver(token.address),
        UNKNOWN_TOKEN_LOGO,
      ].filter((v) => !!v),
    [token]
  );

  const lastSource = sources.length - 1;

  const [, setSource] = useState(0);

  const onImageLoadError = useCallback(
    (error) => {
      setSource((source) => {
        let nextSource = source + 1;
        nextSource = nextSource > lastSource ? lastSource : nextSource;
        error.target.src = sources[nextSource];

        return nextSource;
      });
    },
    [sources, lastSource]
  );

  return (
    <TokenLogoImg
      {...imgProps}
      src={sources[0]}
      alt={`${token.symbol} logo`}
      onError={onImageLoadError}
    />
  );
};
