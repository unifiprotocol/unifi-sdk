import React, { useState, useCallback } from "react";
import { Card, CardBody, CardHeader } from "../Card";
import { Input as InputComponent, InputProps } from ".";

export default {
  title: "Components/Forms/Input",
};

export const Input = () => {
  const [state, setState] = useState<InputProps["value"]>(50);
  const max = useCallback(() => {
    setState(100);
  }, [setState]);
  return (
    <Card>
      <CardHeader>
        <h1>Input</h1>
      </CardHeader>
      <CardBody>
        <h3>Default</h3>
        <InputComponent
          onChange={(evt) => setState(evt.target.value)}
          value={state}
        />
        <h3>With actions</h3>
        <InputComponent
          onChange={(evt) => setState(evt.target.value)}
          actions={[{ label: "MAX", action: max }]}
          value={state}
        />
      </CardBody>
    </Card>
  );
};
