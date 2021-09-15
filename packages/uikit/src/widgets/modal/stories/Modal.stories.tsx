import React from "react";
import { PrimaryButton, SecondaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { ModalClose, ModalProps } from "..";

import { Modal, ModalHeader, ModalBody } from "../Modal";

export default {
  title: "Widgets/Modal",
  argTypes: {},
};

const SimpleModal: React.FC<ModalProps> = ({ close }) => {
  return (
    <Modal>
      <ModalHeader>
        First Modal <ModalClose onClick={close} />
      </ModalHeader>
      <ModalBody>
        <p>
          You can not close me clicking outside. You gotta click the button
          below
        </p>
        <SecondaryButton onClick={close}>Close me</SecondaryButton>
      </ModalBody>
    </Modal>
  );
};

export const ModalComponent = () => {
  const [open] = useModal({
    component: SimpleModal,
  });

  return (
    <>
      <h1>Modals</h1>
      <PrimaryButton onClick={open}>Open it</PrimaryButton>
    </>
  );
};
