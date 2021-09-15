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

const FirstModal: React.FC<ModalProps> = ({ close }) => {
  return (
    <Modal>
      <Card>
        <CardHeader>First Modal</CardHeader>
        <CardBody>
          <p>
            You can not close me clicking outside. You gotta click the button
            below
          </p>
          <SecondaryButton onClick={close}>Close me</SecondaryButton>
        </CardBody>
      </Card>
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
