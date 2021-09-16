import React, { useContext, useCallback } from "react";
import { ModalItem, ModalOptions, ModalProps, NewModalItem } from ".";
import { ModalContext } from "./ModalContext";

const defaultOptions = {
  disableBackdropClick: true,
};
const setDefaults = (options: Partial<ModalOptions> = {}): ModalOptions => {
  return {
    ...defaultOptions,
    ...options,
  };
};
type OpenFn = () => void;
type CloseFn = () => void;

export const useModal = <T extends any>({
  component,
  props,
  options = { ...defaultOptions },
}: NewModalItem<T>): [OpenFn, CloseFn] => {
  const modal: ModalItem = {
    component,
    props: { ...props, close: () => null },
    options: setDefaults(options),
  };

  const { openModal, closeModal, modals } = useContext(ModalContext);

  const open = useCallback(() => openModal(modal), [modal]);
  const close = useCallback(() => closeModal(modals.length - 1), [modal]);

  // as array so you can easily rename on caller
  return [open, close];
};
