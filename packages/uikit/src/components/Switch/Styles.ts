import styled from "styled-components";
import { kfShine } from "../../keyframes";
import { ShinyWrapper } from "../ShinyWrapper";
import { SwitchVariant } from "./Types";

export const SwitchWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const SwitchChoicesWrapper = styled.div`
  padding: 0.3rem;
  background: ${(props) => props.theme.bg100};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-wrap: wrap;
`;

export const Choice = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.3rem 0.4rem;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 2px solid ${(props) => props.theme.bg100};

  > * {
    transition: 0.25s all;
  }

  > svg {
    vertical-align: middle;
    margin-right: 0.4rem;
    opacity: 0;
  }

  &.outline.selected {
    svg {
      opacity: 1;
    }
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
  }

  &.fill.selected {
    svg {
      opacity: 1;
    }
    border-color: ${(props) => props.theme.primary};
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.txt100};
  }

  &.shiny.selected {
    svg {
      opacity: 1;
    }
    border-color: ${(props) => props.theme.primary};
    background: ${(p) => p.theme.shinyGradient};
    color: ${(props) => props.theme.txt100};
    animation: ${kfShine} 2s linear infinite;
    background-size: 200% auto;
  }
`;
