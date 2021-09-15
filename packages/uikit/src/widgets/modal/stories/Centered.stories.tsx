import React from "react";
import { PrimaryButton } from "../../../components/Button";
import { useModal } from "../useModal";
import { Card, CardBody } from "../../../components/Card";
import { Modal } from "../Modal";

export default {
  title: "Widgets/Modal",
  argTypes: {},
};

const CenteredModal = () => (
  <Modal centered={true}>
    <Card>
      <CardBody>I am centered! :)</CardBody>
    </Card>
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
