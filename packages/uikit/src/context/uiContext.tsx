import { Currency } from "@unifiprotocol/utils";
import { createContext } from "react";

export interface UiContextProps {
  tokenLogoResolver?: (address: string) => string;
  tokenLink?: (address: string) => string;
  isNativeToken?: (currency: Currency) => string;
}

export const UiContext = createContext<UiContextProps>({});
