import React, { useState } from "react";
import {
  DangerButton,
  PrimaryButton,
  PrimaryLinkButton,
  SecondaryButton,
  SecondaryLinkButton,
  DangerLinkButton,
} from ".";
import { FaBeer } from "react-icons/fa";
import styled from "styled-components";
import { Checkbox } from "../Checkbox";
export default {
  title: "Components/Button",
};

const ButtonsGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ButtonShow = (Primary, Secondary, Danger, variant) => {
  const [icons, setIcons] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <h1>Buttons {variant}</h1>
      <div>
        <Checkbox checked={icons} label="With icons?" onChange={setIcons} />
      </div>
      <div>
        <Checkbox checked={disabled} label="Disabled?" onChange={setDisabled} />
      </div>
      {["sm", "md", "xl"].map((size) => (
        <>
          <h4>Size {size.toUpperCase()}</h4>
          <h5>Enabled</h5>
          <ButtonsGrid>
            <Primary size={size} variant={variant} disabled={disabled}>
              {icons && <FaBeer size={12} />}
              Primary
            </Primary>
            <Secondary size={size} variant={variant} disabled={disabled}>
              {icons && <FaBeer size={12} />}
              Secondary
            </Secondary>
            <Danger size={size} variant={variant} disabled={disabled}>
              {icons && <FaBeer size={12} />}
              Danger
            </Danger>
          </ButtonsGrid>
        </>
      ))}
    </>
  );
};

export const FilledButton = () =>
  ButtonShow(PrimaryButton, SecondaryButton, DangerButton, "fill");

export const OutlinedButton = () =>
  ButtonShow(PrimaryButton, SecondaryButton, DangerButton, "outline");

export const FilledLinkButton = () =>
  ButtonShow(PrimaryLinkButton, SecondaryLinkButton, DangerLinkButton, "fill");

export const OutlinedLinkButton = () =>
  ButtonShow(
    PrimaryLinkButton,
    SecondaryLinkButton,
    DangerLinkButton,
    "outline"
  );
