import React, { useState, useCallback } from "react";

import { Input, InputProps } from ".";
export default {
  title: "Components/Input",
};

const ShowDemo = (props: Omit<InputProps, "onChange">) => () => {
  const [state, setState] = useState<InputProps["value"]>(props.value);

  return (
    <>
      <h1>Input</h1>
      <Input
        {...props}
        onChange={(evt) => setState(evt.target.value)}
        value={state}
      />
    </>
  );
};

export const Basic = ShowDemo({ value: "Hello" });

export const WithActions = () => {
  const [state, setState] = useState<InputProps["value"]>(50);
  const max = useCallback(() => {
    setState(100);
  }, [setState]);
  return (
    <>
      <h1>Input</h1>
      <Input
        onChange={(evt) => setState(evt.target.value)}
        actions={[{ label: "MAX", action: max }]}
        value={state}
      />
    </>
  );
};
