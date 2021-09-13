import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox, CheckboxProps } from ".";

const ShowDemo = (props: Omit<CheckboxProps, "onChange">) => () => {
  const [state, setState] = useState(props.checked);

  return (
    <>
      <h1>Checkbox</h1>
      <Checkbox {...props} checked={state} onChange={setState} />
    </>
  );
};

storiesOf("Checkbox", module)
  .add("Basic", ShowDemo({ checked: true }))
  .add(
    "With Label",
    ShowDemo({ checked: true, label: "You better check yo self " })
  )
  .add(
    "With link in label",
    ShowDemo({
      checked: true,
      label: (
        <>
          You better check yo self after{" "}
          <a target="_blank" href="#">
            reading our policy
          </a>{" "}
        </>
      ),
    })
  );
