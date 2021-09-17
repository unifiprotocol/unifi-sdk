import React from "react";
import { PrimaryButton, SecondaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { ModalProps } from "..";
import { Modal, ModalHeader, ModalBody } from "../Modal";

export default {
  title: "Widgets/Modal",
  argTypes: {},
};

const FirstModal: React.FC<ModalProps> = ({ close }) => {
  return (
    <Modal>
      <Modal>
        <ModalHeader>First Modal</ModalHeader>
        <ModalBody>
          <p>
            You can not close me clicking outside. You gotta click the button
            below
          </p>
          <SecondaryButton onClick={close}>Close me</SecondaryButton>
        </ModalBody>
      </Modal>
    </Modal>
  );
};

export const BackdropClickDisabled = () => {
  const [open] = useModal({
    component: FirstModal,
    options: { disableBackdropClick: true },
  });

  return (
    <>
      <h1>Modals</h1>
      <PrimaryButton onClick={open}>Open it</PrimaryButton>
    </>
  );
};
