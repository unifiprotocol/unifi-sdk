import React, { useState } from "react";

import { Checkbox, CheckboxProps } from ".";
export default {
  title: "Components/Checkbox",
};
const ShowDemo = (props: Omit<CheckboxProps, "onChange">) => () => {
  const [state, setState] = useState(props.checked);

  return (
    <>
      <h1>Checkbox</h1>
      <Checkbox {...props} checked={state} onChange={setState} />
    </>
  );
};

export const Basic = ShowDemo({ checked: true });
export const WithLabel = ShowDemo({
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
