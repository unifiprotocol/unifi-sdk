import "styled-components";
import { UnifiTheme } from "../themes/types";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends UnifiTheme {}
}
