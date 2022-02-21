import { mediaQueries } from "@unifiprotocol/uikit";
import styled from "styled-components";

export const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  padding: 1rem;
  transition: width 0.25s ease 0s;
  overflow: auto;
  flex-shrink: 0;

  ${mediaQueries.xs} {
    width: ${(props) => (props.isOpen ? `15rem` : `0`)};
    padding: ${(props) => (props.isOpen ? `1rem` : `0`)};
  }

  ${mediaQueries.sm} {
    padding: 1rem 0px 0px 1rem;
    width: 4.5rem;
  }

  ${mediaQueries.lg} {
    width: 15rem;
  }
`;
