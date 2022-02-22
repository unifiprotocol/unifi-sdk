import { mediaQueries } from "@unifiprotocol/uikit";
import styled from "styled-components";

export const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  margin: 1rem;
  transition: width 0.25s ease 0s;
  overflow: auto;
  flex-shrink: 0;

  ${mediaQueries.xs} {
    width: ${(props) => (props.isOpen ? `15rem` : `0`)};
  }

  ${mediaQueries.sm} {
    width: 4.5rem;
  }

  ${mediaQueries.lg} {
    width: 15rem;
  }
`;

export const SidebarItemWrapper = styled.div<{ active: boolean }>`
  padding: 1rem;
  margin-bottom: 0.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  :hover {
    border-radius: ${(props) => props.theme.borderRadius};
    cursor: pointer;
    background: ${(props) => props.theme.bgAlt};
  }

  ${mediaQueries.sm} {
    justify-content: center;
    span:last-of-type {
      display: none;
    }
  }

  ${mediaQueries.lg} {
    span:last-of-type {
      display: inline;
    }
    justify-content: flex-start;
  }
`;

export const SidebarItemIcon = styled.span`
  margin-right: 0.5rem;

  ${mediaQueries.sm} {
    margin: 0;
  }

  ${mediaQueries.lg} {
    margin-right: 0.5rem;
  }
`;
