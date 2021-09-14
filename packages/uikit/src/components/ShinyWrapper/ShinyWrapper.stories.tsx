import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Card, CardHeader, CardBody } from "../Card";
import { Input } from "../Input";
import { ShinnyWrapperOpts, ShinyWrapper } from ".";

storiesOf("ShinyWrapper", module).add("Playground", () => {
  const [active, setActive] = useState(false);
  const [size, setSize] = useState("2");
  const [mode, setMode] = useState<ShinnyWrapperOpts["mode"]>(
    "on-focus-within"
  );

  return (
    <>
      <h1>Shiny wrapper</h1>
      <div>
        Mode:{" "}
        <select onChange={(evt) => setMode(evt.target.value as any)}>
          <option selected={mode === "manual"} value="manual">
            Manual
          </option>
          <option selected={mode === "on-focus-within"} value="on-focus-within">
            On focus within
          </option>
        </select>
      </div>
      <div>
        Size:
        <input
          value={size}
          onChange={(evt) => setSize(evt.target.value)}
          type="number"
        />{" "}
      </div>
      <div>
        Activate:
        <input
          onChange={(evt) => setActive(evt.target.checked)}
          type="checkbox"
          disabled={mode !== "manual"}
        />{" "}
        (Only on manual mode)
      </div>
      <ShinyWrapper size={`${size}px`} mode={mode} active={active}>
        <Card>
          <CardHeader>
            <h3>Card title</h3>
          </CardHeader>

          <CardBody>
            <Input placeholder="Click me to test focus within mode" />
          </CardBody>
        </Card>
      </ShinyWrapper>
    </>
  );
});
