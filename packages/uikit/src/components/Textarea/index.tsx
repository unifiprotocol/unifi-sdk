import React from "react";
import { ShinyWrapper } from "../ShinyWrapper";
import { TextareaElement } from "./Styles";

type TextareaProps = {
  onChange?: (v: string) => void;
  cols?: string;
  rows?: string;
};

export const Textarea: React.FC<TextareaProps> = ({ onChange, rows, cols }) => {
  return (
    <ShinyWrapper inline={true} mode={"on-focus-within"} size="2px">
      <TextareaElement
        {...{ rows, cols: cols ?? "999999" }}
        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange && onChange(evt.currentTarget.value)
        }
      />
    </ShinyWrapper>
  );
};
