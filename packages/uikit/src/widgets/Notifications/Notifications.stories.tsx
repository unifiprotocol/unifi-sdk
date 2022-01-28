import React, { useCallback } from "react";
import styled from "styled-components";
import {
  DangerButton,
  PrimaryButton,
  SecondaryButton,
} from "../../components/Button";
import { useNotifications } from "./useNotifications";
export default {
  title: "Widgets/Notifications",
  argTypes: {},
};
const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
export const Default = () => {
  const { notify } = useNotifications();
  const success = useCallback(
    () =>
      notify({
        appearance: "success",
        content: "You are great ❤️",
      }),
    []
  );

  const error = useCallback(
    () =>
      notify({
        appearance: "error",
        content: "Get a shower dude 💩",
      }),
    []
  );

  const warn = useCallback(
    () =>
      notify({
        appearance: "warning",
        content: "Don't click me more ⚠️",
      }),
    []
  );

  const info = useCallback(
    () =>
      notify({
        appearance: "info",
        content: "I was angry while writing this code 🍔",
      }),
    []
  );

  const custom1 = useCallback(
    () =>
      notify({
        appearance: "info",
        content: (
          <>
            <b>Hey dude!</b>
            <br />
            Feel free to add free html to the notification. And{" "}
            <a href="#jaja">some links!</a>
          </>
        ),
      }),
    []
  );

  const buttonNotification = useCallback(
    () =>
      notify({
        appearance: "info",
        content: (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <b>Hey dude!</b>

            <span>Keep kalm and...</span>

            <SecondaryButton size="sm" onClick={() => alert("What did I say?")}>
              Dont click me
            </SecondaryButton>
          </div>
        ),
      }),
    []
  );

  return (
    <div>
      <h1>Notifications</h1>

      <h3>Text notifications</h3>
      <Wrapper>
        <PrimaryButton onClick={success}>Success notification</PrimaryButton>
        <DangerButton onClick={error}>Danger notification</DangerButton>
        <SecondaryButton onClick={warn}>Warning notification</SecondaryButton>
        <SecondaryButton onClick={info}>Info notification</SecondaryButton>
      </Wrapper>
      <h3>Custmon notifications</h3>
      <Wrapper>
        <SecondaryButton onClick={custom1}>
          Notification with title and link
        </SecondaryButton>
        <SecondaryButton onClick={buttonNotification}>
          Notification with button and interaction
        </SecondaryButton>
      </Wrapper>
    </div>
  );
};
