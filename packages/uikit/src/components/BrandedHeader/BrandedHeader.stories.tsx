import React from "react";
import { storiesOf } from "@storybook/react";
import { BrandedHeader } from ".";

storiesOf("BrandedHeader", module)
  .add("BrandedHeader", () => (
    <>
      <BrandedHeader />
      <h1>BrandedHeader</h1>
    </>
  ))
  .add("BrandedHeaderFixed", () => (
    <>
      <BrandedHeader fixed />
      <div style={{ paddingTop: "3rem" }}>
        <h1>BrandedHeaderFixed</h1>
      </div>
    </>
  ));
