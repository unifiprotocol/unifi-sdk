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

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.primaryDark};
    border-color: ${(p) => p.theme.primaryDark};

    color: #000 !important;
    svg {
      color: #000 !important;
    }
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${(p) =>
    p.variant === "outline" ? "transparent" : p.theme.bg300};
  border-color: ${(p) => p.theme.bg300};
  color: ${(p) => p.theme.txt100} !important;
  &:not(:disabled):hover {
    background-color: ${(p) => p.theme.bg200};
    border-color: ${(p) => p.theme.bg200};
  }
`;

export const DangerButton = styled(BaseButton)`
  background-color: ${(p) =>
    p.variant === "outline" ? "transparent" : p.theme.danger};
  border-color: ${(p) => p.theme.danger};

  &,
  svg {
    color: ${(p) => (p.variant === "outline" ? p.theme.danger : "#fff")};
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.dangerDark};
    border-color: ${(p) => p.theme.dangerDark};

    color: ${(p) => (p.variant === "outline" ? "#fff" : "#fff")}!important;
    svg {
      color: ${(p) => (p.variant === "outline" ? "#fff" : "#fff")};
    }
  }
`;

export const PrimaryLinkButton = styled(PrimaryButton).attrs({
  as: "a",
})`
  text-decoration: none;
`;

export const SecondaryLinkButton = styled(SecondaryButton).attrs({
  as: "a",
})`
  text-decoration: none;
`;

export const DangerLinkButton = styled(DangerButton).attrs({
  as: "a",
})`
  text-decoration: none;
`;
