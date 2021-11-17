/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styled from "styled-components";

const paddingBySize = {
  sm: "0.1rem 0.25rem",
  md: "0.35rem 0.5rem",
  xl: "1rem 0.6rem",
};
const fontSizeBySize = {
  sm: "0.8rem",
  md: "0.9rem",
  xl: "1rem",
};

export const BaseButton = styled.button<{
  onlyIcon?: boolean;
  variant?: "outline" | "fill";
  size?: "sm" | "md" | "xl";
  block?: boolean;
}>`
  display: ${(p) => (p.block ? "flex" : "inline-flex")};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: ${(p) => (p.block ? "100%" : "auto")};
  font-size: ${(p) => fontSizeBySize[p.size!]};
  vertical-align: middle;
  line-height: 1rem;
  padding: ${(p) => paddingBySize[p.size!]};
  color: #fff;
  text-align: center;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s;
  border: 2px solid transparent;
  border-radius: ${(props) => props.theme.borderRadius};

  &:disabled {
    opacity: 0.6;
  }

  &:disabled {
    cursor: default;
  }

  svg {
    transition: 0.25s all;
    color: #fff;
    margin-right: ${(p) => (p.onlyIcon ? "0" : "0.4rem")};
  }
`;

BaseButton.defaultProps = {
  variant: "fill",
  size: "md",
  block: false,
  onlyIcon: false,
};
