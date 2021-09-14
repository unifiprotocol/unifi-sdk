import React, { useCallback, useState } from "react";
import { ShinyWrapper } from "../ShinyWrapper";
import {
  ActionButton,
  Actions,
  InputBox,
  InputPrefix,
  InputWrapper,
} from "./Styles";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefixAddon?: React.ReactNode;
  disableFocusEffect?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
};

const preventFocus = (action: () => void) => (evt: any) => {
  evt.stopPropagation();
  action();
};

export const Input: React.FC<InputProps> = ({
  prefixAddon,
  actions,
  disableFocusEffect = false,
  ...props
}) => {
  const [ref, setRef] = useState<any>();
  const focus = useCallback(() => {
    ref && ref.focus();
  }, [ref]);
  const shinyMode = disableFocusEffect ? "manual" : "on-focus-within";
  return (
    <ShinyWrapper mode={shinyMode} size="2px">
      <InputWrapper onClick={focus}>
        {prefixAddon && <InputPrefix>{prefixAddon}</InputPrefix>}
        <InputBox {...props} ref={(input: any) => setRef(input)} />
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
    </ShinyWrapper>
  );
};
