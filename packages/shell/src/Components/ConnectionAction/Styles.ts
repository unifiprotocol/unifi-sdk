import { mediaQueries, SecondaryButton } from "@unifiprotocol/uikit";
import styled from "styled-components";

export const NativeBalance = styled(SecondaryButton)`
  ${mediaQueries.xs} {
    display: none;
  }

  ${mediaQueries.sm} {
    + button {
      margin-left: -0.3rem !important;
    }
  }
`;

export const NativeBalanceSymbol = styled.span`
  margin-left: 0.2rem;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt300};
`;
