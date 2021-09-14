import React, { useCallback } from "react";
import styled from "styled-components";
import { CgCheck } from "react-icons/cg";
import { disableSelectionCss } from "../../util/DOM";
import { Themed } from "../../themes/types";

const CheckboxWrapper = styled.div<Themed<{ disabled: boolean }>>`
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  display: inline-flex;
  align-items: center;
`;

const Box = styled.div<Themed<{ disabled: boolean; checked: boolean }>>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: ${(p) => (p.checked ? p.theme.primary : "transparent")};
  border: 2px solid ${(p) => (p.disabled ? p.theme.muted : p.theme.primary)};
  border-radius: 1px;
  &,
  svg {
    transition: 0.15s all;
  }
  ${(p) =>
    !p.disabled &&
    `
  &:hover {
    svg {
      opacity: 1;
    }
  }
  `}
  svg {
    opacity: ${(p) => (p.checked ? 1 : 0.1)};
    color: #fff;
  }
`;
const Label = styled.div`
  margin-left: 0.5rem;
  ${disableSelectionCss}
`;

export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange: (value: boolean) => void;
}
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
}) => {
  const dontCheckOnAnchorClick = useCallback((evt) => {
    if (evt.target.nodeName === "A") {
      evt.stopPropagation();
    }
  }, []);
  return (
    <CheckboxWrapper
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
    >
      <Box disabled={disabled} checked={checked}>
        <CgCheck size={22} />
      </Box>
      {label && <Label onClick={dontCheckOnAnchorClick}>{label}</Label>}
    </CheckboxWrapper>
  );
};
