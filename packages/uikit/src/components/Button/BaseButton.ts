import styled from "styled-components";

const paddingBySize = {
  sm: "0.1rem 0.25rem",
  md: "0.35rem 0.5rem",
  xl: "0.6rem",
};

export const BaseButton = styled.button<{
  variant?: "outline" | "fill";
  size?: "sm" | "md" | "xl";
  block?: boolean;
}>`
  display: ${(p) => (p.block ? "block" : "inline-block")};
  width: ${(p) => (p.block ? "100%" : "auto")};
  font-size: 0.9rem;
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
    margin-right: 0.4rem;
  }
`;

BaseButton.defaultProps = {
  variant: "fill",
  size: "md",
  block: false,
};
