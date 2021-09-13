import { createContext } from "react";

export const UiResolverCtx = createContext<{
  tokenLogoResolver?: TokenLogoResolverFn;
}>({});

export type TokenLogoResolverFn = (address: string) => string;
