import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { disableSelectionCss } from "../../util/DOM";
import { Themed } from "../../themes/types";

const InputWrapper = styled.div<Themed>`
  display: flex;
  align-items: center;
  background: ${(p) => p.theme.bg200};
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 0.6rem;
  height: 3rem;
`;

const InputBox = styled.input<Themed>`
  outline: none;
  background: transparent;
  color: ${(p) => p.theme.txt100};
  border-radius: ${(p) => p.theme.borderRadius};
  border: none;
  font-size: 1rem;
  color: ${(p) => p.theme.txt100};
`;

const Label = styled.div`
  margin-left: 0.5rem;
  ${disableSelectionCss}
`;
const Actions = styled.div``;
const ActionButton = styled.button`
  font-size: 0.9rem;
  cursor: pointer;
  color: ${(p) => p.theme.txt200};
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.bg300};
  border: 2px solid transparent;
  transition: 0.2s all;
  font-weight: 300;
  padding: 0.3rem;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
  }
`;
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
};

const preventFocus = (action: () => void) => (evt: any) => {
  evt.stopPropagation();
  action();
};

export const Input: React.FC<InputProps> = ({ label, actions, ...props }) => {
  const [ref, setRef] = useState<any>();
  const focus = useCallback(() => {
    ref && ref.focus();
  }, [ref]);

  return (
    <InputWrapper onClick={focus}>
      {label && <Label>{label}</Label>}
      <InputBox {...props} ref={(input) => setRef(input)} />
      {actions && (
        <Actions>
          {actions.map(({ label, action }) => (
            <ActionButton key={label} onClick={preventFocus(action)}>
              {label}
            </ActionButton>
          ))}
        </Actions>
      )}
    </InputWrapper>
  );
};
