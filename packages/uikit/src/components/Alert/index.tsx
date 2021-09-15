import React from "react";
import styled from "styled-components";
import { ShinyWrapper } from "../ShinyWrapper";

interface AlertProps {
  variant?: "outline" | "fill";
}

const AlertBase = styled.div<AlertProps>`
  padding: 0.8rem;
  font-size: 0.95rem;
  color: #fff;
  border: 3px solid ${(props) => props.theme.bg300};
  background: ${(p) => (p.variant === "fill" ? p.theme.bg300 : "transparent")};
  margin-bottom: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  text-align: justify;
  a {
    color: #fff;
  }
`;

export const MessageAlert = styled(AlertBase)``;

export const WarningAlert = styled(AlertBase)`
  border-color: ${(p) => p.theme.warning};
  background: ${(p) =>
    p.variant === "fill" ? p.theme.warning : "transparent"};

  color: ${(p) => (p.variant === "fill" ? "#000" : p.theme.warning)};
  a {
    color: ${(p) => (p.variant === "fill" ? "#000" : p.theme.warning)};
  }
`;

export const DangerAlert = styled(AlertBase)`
  border-color: ${(p) => p.theme.danger};
  background: ${(p) => (p.variant === "fill" ? p.theme.danger : "transparent")};

  color: ${(p) => (p.variant === "fill" ? "#fff" : p.theme.danger)};
  a {
    color: ${(p) => (p.variant === "fill" ? "#fff" : p.theme.danger)};
  }
`;

export const SuccessAlert = styled(AlertBase)`
  border-color: ${(p) => p.theme.success};
  background: ${(p) =>
    p.variant === "fill" ? p.theme.success : "transparent"};

  color: ${(p) => (p.variant === "fill" ? "#000" : p.theme.success)};
  a {
    color: ${(p) => (p.variant === "fill" ? "#000" : p.theme.success)};
  }
`;
