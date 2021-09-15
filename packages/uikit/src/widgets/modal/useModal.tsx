import React, { useContext, ReactNode, useCallback, Component } from "react";
import { ModalItem, ModalOptions } from ".";
import { ModalContext } from "./ModalContext";

const setDefaults = (options: Partial<ModalOptions> = {}): ModalOptions => {
  return {
    disableBackdropClick: false,
    ...options,
  };
};

interface ModalItemPartialized {
  component: ModalItem["component"];
  props?: ModalItem["props"];
  options?: Partial<ModalItem["options"]>;
}

export const useModal = ({
  component,
  options = {},
  props = {},
}: ModalItemPartialized): [() => void, () => void] => {
  const modal = {
    component,
    props,
    options: setDefaults(options),
  };

  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(() => openModal(modal), [modal]);
  const close = useCallback(() => closeModal(modal), [modal]);

  // as array so you can easily rename on caller
  return [open, close];
};
