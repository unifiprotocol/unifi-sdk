import React from "react";
import { PrimaryButton, SecondaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { ModalProps } from "..";
import { Card, CardHeader, CardBody } from "../../../components/Card";
import { Modal } from "../Modal";

export default {
  title: "Widgets/Modal",
  argTypes: {},
};

const SecondModal: React.FC<ModalProps> = ({ close }) => (
  <Modal>
    <Card>
      <CardHeader>Second Modal</CardHeader>
      <CardBody>
        <p>I am a staked modal!</p>
        <SecondaryButton onClick={close}>Close me</SecondaryButton>
      </CardBody>
    </Card>
  </Modal>
);

const FirstModal: React.FC<ModalProps> = ({ close }) => {
  const [openChild] = useModal({ component: SecondModal });
  return (
    <Modal>
      <Card>
        <CardHeader>First Modal</CardHeader>
        <CardBody>
          <PrimaryButton onClick={openChild}>Open child</PrimaryButton>
          <SecondaryButton onClick={close}>Close me</SecondaryButton>
        </CardBody>
      </Card>
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
