import styled from "styled-components";
import { BaseButton } from "./BaseButton";

export const PrimaryButton = styled(BaseButton)`
  background-color: ${(p) =>
    p.variant === "outline" ? "transparent" : p.theme.primary};
  border-color: ${(p) => p.theme.primary};

  &,
  svg {
    color: ${(p) => (p.variant === "outline" ? p.theme.primary : "#000")};
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    border-color: ${(p) => p.theme.primaryDark};

    color: #000;
    svg {
      color: #000;
    }
  }
  &:disabled:hover {
    background-color: ${(p) =>
      p.variant === "outline" ? "transparent" : p.theme.primaryLight};
    color: ${(p) => (p.variant === "outline" ? p.theme.primaryLight : "#000")};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${(p) =>
    p.variant === "outline" ? "transparent" : p.theme.bg300};
  border-color: ${(p) => p.theme.bg300};

  &:hover {
    background-color: ${(p) => p.theme.bg200};
    border-color: ${(p) => p.theme.bg200};
  }
`;

export const DangerButton = styled(BaseButton)`
  color: #fff;
  background-color: ${(props) => props.theme.danger};
  svg {
    color: #fff;
  }
`;
