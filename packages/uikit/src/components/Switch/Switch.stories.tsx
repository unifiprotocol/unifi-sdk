import React from "react";
import { Switch } from ".";
import { SwitchChoice, SwitchProps } from "./Types";
import { useState } from "@storybook/addons";
import { RiRadioButtonFill } from "react-icons/ri";

export default {
  title: "Components/Switch",
};

const choices: SwitchChoice[] = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

const showSwitch = (props: Omit<SwitchProps, "onChange">) => () => {
  const [selected, setSelected] = useState(props.selected);
  return (
    <>
      <h1>Switch</h1>
      <h2>Outline</h2>
      <Switch {...props} selected={selected} onChange={setSelected} />
      <p>
        Selected value: <b>{selected}</b>
      </p>
      <h2>Fill</h2>
      <Switch
        variant="fill"
        {...props}
        selected={selected}
        onChange={setSelected}
      />
      <p>
        Selected value: <b>{selected}</b>
      </p>
    </>
  );
};

export const Basic = showSwitch({ choices, selected: choices[0].value });
export const WithIcon = showSwitch({
  choices,
  selected: choices[0].value,
  checkIcon: RiRadioButtonFill,
});
