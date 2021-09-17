import React from "react";
import { PrimaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { Modal, ModalHeader, ModalBody } from "../Modal";

export default {
  title: "Widgets/Modal",
  argTypes: {},
};

const CenteredModal = () => (
  <Modal centered={true}>
    <Modal>
      <ModalBody>I am centered! :)</ModalBody>
    </Modal>
  </Modal>
);

export const Centered = () => {
  const [open] = useModal({ component: CenteredModal });

  return (
    <>
      <h1>Modals</h1>
      <PrimaryButton onClick={open}>Open it</PrimaryButton>
    </>
  );
};
