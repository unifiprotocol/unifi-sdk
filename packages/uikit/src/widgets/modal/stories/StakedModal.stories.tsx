import React from "react";
import { PrimaryButton, SecondaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { ModalProps } from "..";
import { Modal, ModalHeader, ModalBody } from "../Modal";

export default {
  title: "Widgets/Modal",
  argTypes: {},
};

const SecondModal: React.FC<ModalProps> = ({ close }) => (
  <Modal>
    <Modal>
      <ModalHeader>Second Modal</ModalHeader>
      <ModalBody>
        <p>I am a staked modal!</p>
        <SecondaryButton onClick={close}>Close me</SecondaryButton>
      </ModalBody>
    </Modal>
  </Modal>
);

const FirstModal: React.FC<ModalProps> = ({ close }) => {
  const [openChild] = useModal({ component: SecondModal });
  return (
    <Modal>
      <Modal>
        <ModalHeader>First Modal</ModalHeader>
        <ModalBody>
          <PrimaryButton onClick={openChild}>Open child</PrimaryButton>
          <SecondaryButton onClick={close}>Close me</SecondaryButton>
        </ModalBody>
      </Modal>
    </Modal>
  );
};

export const StakedModals = () => {
  const [open] = useModal({ component: FirstModal });

  return (
    <>
      <h1>Modals</h1>
      <PrimaryButton onClick={open}>Open it</PrimaryButton>
    </>
  );
};
