import "styled-components";
import { UnifiTheme } from "../themes";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends UnifiTheme {}
}
