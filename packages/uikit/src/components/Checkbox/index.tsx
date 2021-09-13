import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { CgCheck } from "react-icons/cg";
import { disableSelectionCss } from "../../util/DOM";

const CheckboxWrapper = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

const Box = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: ${(p) => (p.checked ? p.theme.primary : "transparent")};
  border: 2px solid ${(p) => p.theme.primary};
  border-radius: 1px;
  &,
  svg {
    transition: 0.15s all;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }

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
  label?: React.ReactNode;
  onChange: (value: boolean) => void;
}
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
}) => {
  const dontCheckOnAnchorClick = useCallback((evt) => {
    if (evt.target.nodeName === "A") {
      evt.stopPropagation();
    }
  }, []);
  return (
    <CheckboxWrapper onClick={() => onChange(!checked)}>
      <Box checked={checked}>
        <CgCheck size={22} />
      </Box>
      {label && <Label onClick={dontCheckOnAnchorClick}>{label}</Label>}
    </CheckboxWrapper>
  );
};
