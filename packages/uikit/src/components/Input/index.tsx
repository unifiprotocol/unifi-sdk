import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { disableSelectionCss } from "../../util/DOM";
import { Themed } from "../../themes/types";

const InputWrapper = styled.div<Themed<{ focused: boolean }>>`
  display: flex;
  align-items: center;
  background: ${(p) => p.theme.bg200};
  border-radius: ${(p) => p.theme.borderRadius};
  border: 2px solid ${(p) => (p.focused ? p.theme.primaryLight : p.theme.bg200)};
  padding: 0.6rem;
  height: 3rem;
  transition: 0.25s all;
`;

const InputBox = styled.input<Themed>`
  outline: none;
  background: transparent;
  color: ${(p) => p.theme.txt100};
  border-radius: ${(p) => p.theme.borderRadius};
  border: none;
  font-size: 1rem;
  color: ${(p) => p.theme.txt100};
  width: 100%;
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
  const [focused, setFocused] = useState(false);
  const focus = useCallback(() => {
    ref && ref.focus();
  }, [ref]);
  const onFocus = useCallback((evt) => {
    setFocused(true);
    props.onFocus && props.onFocus(evt);
  }, []);
  const onBlur = useCallback((evt) => {
    setFocused(false);
    props.onBlur && props.onBlur(evt);
  }, []);
  return (
    <InputWrapper focused={focused} onClick={focus}>
      {label && <Label>{label}</Label>}
      <InputBox
        {...props}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={(input: any) => setRef(input)}
      />
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
