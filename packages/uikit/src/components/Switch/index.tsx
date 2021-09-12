import React, { useMemo } from "react";
import { SwitchProps } from "./Types";

import { Choice, SwitchChoicesWrapper, SwitchWrapper } from "./Styles";
import { calcClassName } from "../../util/DOM";

export const Switch: React.FC<SwitchProps> = ({
  choices,
  selected,
  onChange,
  disabled = false,
  checkIcon = undefined,
  disabledCursor = "block",
}) => {
  const cursor = useMemo(() => {
    return disabled ? disabledCursor : "pointer";
  }, [disabled, disabledCursor]);

  return (
    <SwitchWrapper>
      <SwitchChoicesWrapper>
        {choices.map(({ value, label }, key) => (
          <Choice
            className={calcClassName({ selected: value === selected })}
            style={{ cursor }}
            key={key}
            onClick={() => !disabled && onChange(value)}
          >
            {checkIcon && checkIcon({ size: 12 })}
            {label}
          </Choice>
        ))}
      </SwitchChoicesWrapper>
    </SwitchWrapper>
  );
};
