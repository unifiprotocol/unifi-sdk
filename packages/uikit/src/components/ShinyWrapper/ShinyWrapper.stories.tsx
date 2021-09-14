import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Card, CardHeader, CardBody } from "../Card";
import { Input } from "../Input";
import { ShinnyWrapperOpts, ShinyWrapper } from ".";
import { Switch } from "../Switch";
import { SwitchChoice } from "../Switch/Types";
import { Checkbox } from "../Checkbox";
import { TokenAmount } from "../TokenAmount";
import { UNFI_TOKEN } from "../../__mocks__/token.mock";

storiesOf("ShinyWrapper", module)
  .add("Playground", () => {
    const [active, setActive] = useState(false);
    const [size, setSize] = useState("2");
    const [mode, setMode] = useState<ShinnyWrapperOpts["mode"]>(
      "on-focus-within"
    );
    const modeChoices: SwitchChoice[] = [
      { value: "on-focus-within", label: "On focus within" },
      { value: "manual", label: "Manual" },
    ];
    return (
      <>
        <h1>Shiny wrapper</h1>
        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>Config</CardHeader>
          <CardBody>
            <Switch choices={modeChoices} onChange={setMode} selected={mode} />
            <br />
            <Checkbox
              onChange={setActive}
              disabled={mode !== "manual"}
              checked={active}
              label="Activate (Only on manual mode)"
            />
            <br />
            <Input
              prefixAddon="Size"
              value={size}
              onChange={(evt) => setSize(evt.target.value)}
            />
          </CardBody>
        </Card>
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
  })
  .add("Shiny inline items", () => {
    return (
      <ShinyWrapper mode="manual" active={true} inline={true} size={"3px"}>
        <div style={{ width: "8rem" }}>
          <TokenAmount amount={"10"} token={UNFI_TOKEN} />
        </div>
      </ShinyWrapper>
    );
  });
