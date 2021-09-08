import styled from "styled-components";

interface AlertProps {
  variant?: "outline" | "fill";
}

const AlertBase = styled.div<AlertProps>`
  padding: 0.8rem;
  font-size: 0.95rem;
  color: #fff;
  border: 3px solid ${(props) => props.theme.lightestGrey};
  border-radius: ${(props) => props.theme.borderRadius};
  text-align: justify;
  a {
    color: #fff;
  }
`;

export const MessageAlert = styled(AlertBase)``;

export const WarningAlert = styled(AlertBase)`
  border-color: ${(p) => p.theme.warningColor};
  background: ${(p) =>
    p.variant === "fill" ? p.theme.warningColor : "transparent"};

  color: ${(p) => (p.variant === "fill" ? "#000" : p.theme.warningColor)};
  a {
    color: ${(p) => (p.variant === "fill" ? "#000" : p.theme.warningColor)};
  }
`;
