import React from "react";
import { storiesOf } from "@storybook/react";
import { DangerAlert, MessageAlert, SuccessAlert, WarningAlert } from ".";

storiesOf("Alert", module)
  .add("Outline", () => (
    <>
      <h1>Alerts outlined</h1>
      <MessageAlert>Just FYI</MessageAlert>
      <WarningAlert>Beware of me!</WarningAlert>
      <DangerAlert>Something horrible happened!</DangerAlert>
      <SuccessAlert>Its fine</SuccessAlert>
    </>
  ))
  .add("Filled", () => (
    <>
      <h1>Alerts filled</h1>
      <MessageAlert variant="fill">Just FYI</MessageAlert>
      <WarningAlert variant="fill">Beware of me!</WarningAlert>
      <DangerAlert variant="fill">Something horrible happened!</DangerAlert>
      <SuccessAlert variant="fill">Its fine</SuccessAlert>
    </>
  ));
