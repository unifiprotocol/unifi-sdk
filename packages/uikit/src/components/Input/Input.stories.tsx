import React, { useState, useCallback } from "react";
import { storiesOf } from "@storybook/react";
import { Input, InputProps } from ".";

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

storiesOf("Input", module)
  .add("Basic", ShowDemo({ value: "Hello" }))
  .add("With Label", () => <h1>TODO</h1>)
  .add("With actions", () => {
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
  });
