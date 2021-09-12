import React from "react";
import { storiesOf } from "@storybook/react";
import { Switch } from ".";
import { SwitchChoice, SwitchProps } from "./Types";
import { useState } from "@storybook/addons";
import { RiRadioButtonFill } from "react-icons/ri";

const choices: SwitchChoice[] = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

const showSwitch = (props: Omit<SwitchProps, "onChange">) => () => {
  const [selected, setSelected] = useState(props.selected);
  return (
    <>
      <h1>Switch</h1>
      <Switch {...props} selected={selected} onChange={setSelected} />
      <p>
        Selected value: <b>{selected}</b>
      </p>
    </>
  );
};

storiesOf("Switch", module)
  .add("Basic", showSwitch({ choices, selected: choices[0].value }))
  .add(
    "WithIcon",
    showSwitch({
      choices,
      selected: choices[0].value,
      checkIcon: RiRadioButtonFill,
    })
  );
