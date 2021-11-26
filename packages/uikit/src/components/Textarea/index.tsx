import React from "react";
import { ShinyWrapper } from "../ShinyWrapper";
import { TextareaElement } from "./Styles";

type TextareaProps = {
  onChange?: (v: string) => void;
  width?: string;
  height?: string;
};

export const Textarea: React.FC<TextareaProps> = ({
  onChange,
  height,
  width,
}) => {
  return (
    <ShinyWrapper inline={true} mode={"on-focus-within"} size="2px">
      <TextareaElement
        {...{ height, width }}
        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange && onChange(evt.currentTarget.value)
        }
      />
    </ShinyWrapper>
  );
};
