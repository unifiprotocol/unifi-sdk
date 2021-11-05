import React from "react";
import styled from "styled-components";
import { kfShine } from "../../keyframes";

const ShinyHeaderWrapper = styled.h1`
  background: ${(p) => p.theme.shinyGradient};
  background-size: 200% auto;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${kfShine} 2s linear infinite;
`;

export const ShinyHeader: React.FC = ({ children }) => {
  return <ShinyHeaderWrapper>{children}</ShinyHeaderWrapper>;
};
