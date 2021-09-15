import React from "react";
import { PrimaryButton, SecondaryButton } from ".";
import { FaBeer } from "react-icons/fa";

export default {
  title: "Components/Button",
};

const ButtonShow = (BtnComponent) => {
  return (
    <>
      <h1>Button</h1>
      <h2>Basic button</h2>
      <BtnComponent>Button</BtnComponent>
      <h2>Variant outline</h2>
      <BtnComponent variant="outline">Button</BtnComponent>
      <h2>Button with icon</h2>
      <BtnComponent>
        <FaBeer size={15} />
        Button
      </BtnComponent>
    </>
  );
};

export const Primary = () => ButtonShow(PrimaryButton);
export const Secondary = () => ButtonShow(SecondaryButton);
