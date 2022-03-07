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
    width: 4.5rem;
  }

  ${mediaQueries.lg} {
    width: 15rem;
  }
`;

export const SidebarItemWrapper = styled.div<{ active: boolean; icon: any }>`
  padding: 1rem;
  margin-bottom: 0.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  :hover {
    border-radius: ${(props) => props.theme.borderRadius};
    background: ${(props) => props.theme.bgAlt};
    cursor: pointer;
  }

  ${mediaQueries.sm} {
    justify-content: center;
    display: ${(props) => (props.icon ? "flex" : "none")};

    span:last-of-type {
      display: none;
    }
  }

  ${mediaQueries.lg} {
    justify-content: flex-start;
    display: flex;

    span:last-of-type {
      display: inline;
    }
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
