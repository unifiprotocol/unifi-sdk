import React, { useCallback } from "react";
import styled from "styled-components";
import { FaCheck as CheckIcon } from "react-icons/fa";
import { disableSelectionCss } from "../../util/DOM";
import { Themed } from "../../themes";

const CheckboxWrapper = styled.div<Themed<{ disabled: boolean }>>`
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  display: inline-flex;
  align-items: center;
`;

const Box = styled.div<Themed<{ disabled: boolean; checked: boolean }>>`
  display: inline-block;
  width: 1.3rem;
  line-height: 1.3rem;
  text-align: center;
  height: 1.3rem;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};

  background: ${(p) => {
    if (p.checked) {
      return p.disabled ? "transparent" : p.theme.primary;
    }
  }};

  border: 2px solid transparent;
  border-color: ${(p) => {
    if (p.disabled) {
      return p.theme.txtMuted;
    }
    if (p.checked) {
      return p.theme.primary;
    }
    return p.theme.bgContrast100;
  }};
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
    color: ${(p) => (p.disabled ? p.theme.txtMuted : p.theme.txt100)};
  }
`;
const Label = styled.div<{ disabled: boolean }>`
  margin-left: 0.5rem;
  ${disableSelectionCss}
  color:${(p) => (p.disabled ? p.theme.txtMuted : p.theme.txt100)}
`;

export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (value: boolean) => void;
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
      onClick={() => !disabled && onChange && onChange(!checked)}
    >
      <Box disabled={disabled} checked={checked}>
        <CheckIcon size={11} />
      </Box>
      {label && (
        <Label disabled={disabled} onClick={dontCheckOnAnchorClick}>
          {label}
        </Label>
      )}
    </CheckboxWrapper>
  );
};
