import React from "react";
import { SelectMenu } from ".";
import { Card, CardBody, CardHeader } from "../Card";

export default {
  title: "Components/Forms/SelectMenu",
};

export const Default = () => (
  <>
    <Card>
      <CardHeader>
        <h1>SelectMenu</h1>
      </CardHeader>
      <CardBody>
        <SelectMenu
          disabled={true}
          label="Sort by"
          options={[
            { label: "APY", value: "apy" },
            { label: "APR", value: "apr", isDisabled: true },
            { label: "Stake", value: "stake" },
          ]}
        />
        <SelectMenu
          disabled={true}
          label="Sort by"
          options={[
            { label: "APY", value: "apy" },
            { label: "APR", value: "apr", isDisabled: true },
            { label: "Stake", value: "stake" },
          ]}
        />
        <SelectMenu
          disabled={true}
          label="Sort by"
          options={[
            { label: "APY", value: "apy" },
            { label: "APR", value: "apr", isDisabled: true },
            { label: "Stake", value: "stake" },
          ]}
        />
      </CardBody>
    </Card>
  </>
);
