import React from "react";
import styled from "styled-components";
import { kfShine } from "../../keyframes";
import { calcClassName } from "../../util/DOM";

export interface ShinnyWrapperOpts {
  size?: string;
  active?: boolean;
  inline?: boolean;
  mode: "on-focus-within" | "manual";
}

const ShinyInnerWrapper = styled.div<{ inline: boolean; size: string }>`
  padding: ${(p) => p.size};
  border-radius: ${(p) => p.theme.borderRadius};
  display: ${(p) => (p.inline ? "inline-block" : "block")};
  &.onFocusWithin:focus-within,
  &.manual.active {
    animation: ${kfShine} 3s linear infinite;

    background: ${(p) => p.theme.shinyGradient};
    background-size: 200% auto;
  }
`;

export const ShinyWrapper: React.FC<ShinnyWrapperOpts> = ({
  children,
  mode,
  active,
  size = "2px",
  inline = false,
}) => (
  <ShinyInnerWrapper
    inline={inline}
    size={size}
    className={calcClassName({
      manual: mode === "manual",
      active: !!active,
      onFocusWithin: mode === "on-focus-within",
    })}
  >
    {children}
  </ShinyInnerWrapper>
);
