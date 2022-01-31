import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  DangerButton,
  PrimaryButton,
  SecondaryButton,
} from "../../components/Button";
import { useNotifications } from "./useNotifications";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";

export default {
  title: "Widgets/Notifications",
  argTypes: {},
};
const InlineWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const ConfigWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${(p) => p.theme.bgAlt2};
`;
const ConfigTitle = styled.div`
  font-weight: bold;
  color: ${(p) => p.theme.txtMuted};
`;
export const Default = () => {
  const { notify } = useNotifications();

  const [autoClose, setAutoClose] = useState(true);
  const [duration, setDuration] = useState(1000);
  const [position, setPosition] = useState<any>("top-right");

  const success = useCallback(
    () =>
      notify({
        appearance: "success",
        disableAutoClose: !autoClose,
        content: "You are great ❤️",
        position,
        duration,
      }),
    [duration, position, autoClose]
  );

  const error = useCallback(
    () =>
      notify({
        appearance: "error",
        disableAutoClose: !autoClose,
        content: "Get a shower dude 💩",
        position,
        duration,
      }),
    [duration, position, autoClose]
  );

  const warn = useCallback(
    () =>
      notify({
        appearance: "warning",
        content: "Don't click me more ⚠️",
        disableAutoClose: !autoClose,
        duration,
        position,
      }),
    [duration, position, autoClose]
  );

  const info = useCallback(
    () =>
      notify({
        appearance: "info",
        disableAutoClose: !autoClose,
        content: "I was angry while writing this code 🍔",
        duration,
        position,
      }),
    [duration, position, autoClose]
  );

  const custom1 = useCallback(
    () =>
      notify({
        appearance: "info",
        duration,
        disableAutoClose: !autoClose,
        position,
        content: (
          <>
            <b>Hey dude!</b>
            <br />
            Feel free to add free html to the notification. And{" "}
            <a href="#jaja">some links!</a>
          </>
        ),
      }),
    [duration, position, autoClose]
  );

  const buttonNotification = useCallback(
    () =>
      notify({
        appearance: "info",
        duration,
        disableAutoClose: !autoClose,
        position,
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
    [duration, position, autoClose]
  );

  return (
    <div>
      <h1>Notifications</h1>
      <ConfigWrapper>
        <InlineWrapper>
          <ConfigTitle>Duration</ConfigTitle>
          <Checkbox
            checked={autoClose}
            onChange={setAutoClose}
            label={"Autoclose"}
          />
          <Input
            disabled={!autoClose}
            value={duration}
            onChange={(evt) => setDuration(Number(evt.target.value))}
          />
        </InlineWrapper>
        <InlineWrapper>
          <ConfigTitle>Position</ConfigTitle>
          {[
            "top-left",
            "top-center",
            "top-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ].map((_position) => {
            const Btn =
              position === _position ? PrimaryButton : SecondaryButton;
            return (
              <Btn
                variant="outline"
                size="sm"
                onClick={() => setPosition(_position)}
                key={_position}
              >
                {_position}
              </Btn>
            );
          })}
        </InlineWrapper>
      </ConfigWrapper>
      <h3>Text notifications</h3>
      <InlineWrapper>
        <PrimaryButton onClick={success}>Success notification</PrimaryButton>
        <DangerButton onClick={error}>Danger notification</DangerButton>
        <SecondaryButton onClick={warn}>Warning notification</SecondaryButton>
        <SecondaryButton onClick={info}>Info notification</SecondaryButton>
      </InlineWrapper>
      <h3>Component notifications</h3>
      <InlineWrapper>
        <SecondaryButton onClick={custom1}>
          Notification with title and link
        </SecondaryButton>
        <SecondaryButton onClick={buttonNotification}>
          Notification with button and interaction
        </SecondaryButton>
      </InlineWrapper>
    </div>
  );
};
