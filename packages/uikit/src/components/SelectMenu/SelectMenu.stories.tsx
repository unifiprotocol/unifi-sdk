import React from "react";
import { SelectMenu } from ".";

export default {
  title: "Components/SelectMenu",
};

export const Default = () => (
  <>
    <h1>SelectMenu</h1>
    <SelectMenu
      disabled={true}
      label="Sort by"
      options={[
        { label: "APY", value: "apy" },
        { label: "APR", value: "apr", isDisabled: true },
        { label: "Stake", value: "stake" },
      ]}
    />
  </>
);
