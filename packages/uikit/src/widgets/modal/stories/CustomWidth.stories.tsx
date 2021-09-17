import React from "react";
import { PrimaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { Modal, ModalHeader, ModalBody } from "../Modal";
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
      <Modal>
        <ModalBody>I am tiny! :)</ModalBody>
      </Modal>
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
