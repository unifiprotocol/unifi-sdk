import { mediaQueries } from "@unifiprotocol/uikit";
import styled from "styled-components";

export const LeftMenuWrapper = styled.span`
  cursor: pointer;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  display: none;

  ${mediaQueries.xs} {
    display: inline-block;
  }
`;
