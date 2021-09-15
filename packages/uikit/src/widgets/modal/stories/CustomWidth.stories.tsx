import React from "react";
import { PrimaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { Card, CardBody } from "../../../components/Card";
import { Modal } from "../Modal";
import styled from "@emotion/styled-base";

export default {
  title: "Widgets/Modal",
  argTypes: {},
};

const ModalCustomWidth = styled(Modal)`
  max-width: 200px;
`;

const CustomWidthModal = () => {
  return (
    <ModalCustomWidth centered={true}>
      <Card>
        <CardBody>I am tiny! :)</CardBody>
      </Card>
    </ModalCustomWidth>
  );
};

export const CustomWidth = () => {
  const [open] = useModal({ component: CustomWidthModal });

  return (
    <>
      <h1>Modals</h1>
      <PrimaryButton onClick={open}>Open it</PrimaryButton>
    </>
  );
};
