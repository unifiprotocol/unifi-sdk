import React from "react";
import { ToastNotification, ToastContainer } from ".";
import { Card, CardBody, CardHeader } from "../Card";

export default {
  title: "Components/Notifications",
};

export const Basic = () => (
  <>
    <ToastNotification appearance="info">
      FYI, something has happened
    </ToastNotification>
    <ToastNotification appearance="success">
      Congratulations! <br />
      You have done something good
    </ToastNotification>
    <ToastNotification appearance="warning">
      Dont worry but take care
    </ToastNotification>
    <ToastNotification appearance="error">
      Don't hate me but,I will tell you
      <br /> something wrong here
    </ToastNotification>
  </>
);
export const Dismisable = () => (
  <>
    <ToastNotification onDismiss={() => alert("Dismissed")} appearance="info">
      You could close me
    </ToastNotification>
  </>
);
export const DismisTimeout = () => (
  <>
    <ToastNotification appearance="info" autoDismissTimeout={5000}>
      Once the bar finish it would close itself
    </ToastNotification>
  </>
);
export const HihglightedText = () => (
  <>
    <h2>Highligted titles</h2>
    <ToastNotification appearance="info">
      <b>For your information</b>
      <br /> something has happened
    </ToastNotification>
    <ToastNotification appearance="success">
      <b>Congratulations!</b> <br />
      Your notification title looks nice
    </ToastNotification>
    <ToastNotification appearance="warning">
      <b>Hey you!</b>
      <br />
      Dont worry but take care
    </ToastNotification>
    <ToastNotification appearance="error">
      <b>I am sorry</b>
      <br />I will tell you something wrong here
    </ToastNotification>
    <h2>Highligted words</h2>
    <ToastNotification appearance="error">
      There is something wrong
      <br />
      You forgot to <b>pay</b> the gas
    </ToastNotification>
  </>
);
export const WithLink = () => (
  <>
    <ToastNotification appearance="info">
      FYI, something has happened
      <br />
      <a href="#">More info here.</a>
    </ToastNotification>
    <ToastNotification appearance="success">
      Congratulations! <br />
      Get your reward <a href="#">clicking here</a>
    </ToastNotification>
    <ToastNotification appearance="warning">
      Dont worry but take care
    </ToastNotification>
    <ToastNotification appearance="error">
      Don't hate me but, you must <br />
      <a href="#">visit this link.</a>
    </ToastNotification>
  </>
);
export const FloatingInContainer = () => (
  <>
    <Card style={{ width: "100%" }}>
      <CardHeader>Some content</CardHeader>
      <CardBody>
        You could have some nice content here while the notifications are
        displayed at the top
      </CardBody>
    </Card>
    <ToastContainer>
      <ToastNotification appearance="info">
        <b>For your information</b>
        <br /> something has happened
      </ToastNotification>
    </ToastContainer>
  </>
);
