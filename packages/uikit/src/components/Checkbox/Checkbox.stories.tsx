import React, { useState } from "react";

import { Checkbox, CheckboxProps } from ".";
export default {
  title: "Components/Forms/Checkbox",
};
const ShowDemo = (props: Omit<CheckboxProps, "onChange">) => () => {
  const [state, setState] = useState(props.checked);
  const [state2, setState2] = useState(!props.checked);

  return (
    <>
      <h1>Checkbox</h1>
      <h4>Checked</h4>
      <Checkbox {...props} checked={state} onChange={setState} />
      <h4>Unchecked</h4>
      <Checkbox {...props} checked={state2} onChange={setState2} />
      <h4>Checked & Disabled</h4>
      <Checkbox
        {...props}
        label="You can't touch this"
        disabled={true}
        checked={true}
      />
      <h4>UnChecked & Disabled</h4>
      <Checkbox
        {...props}
        label="You can't touch this"
        disabled={true}
        checked={false}
      />
    </>
  );
};

export const Basic = ShowDemo({
  checked: true,
  label: "You better check yo self ",
});

export const WithLinkInLabel = ShowDemo({
  checked: true,
  label: (
    <>
      You better check yo self after{" "}
      <a target="_blank" href="#">
        reading our policy
      </a>{" "}
    </>
  ),
});
