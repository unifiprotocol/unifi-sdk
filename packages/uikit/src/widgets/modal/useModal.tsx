import { useContext, useCallback, useEffect, useMemo } from "react";
import { ModalItem, ModalOptions, NewModalItem } from ".";
import { ModalContext } from "./ModalContext";

const defaultOptions = {
  disableBackdropClick: false,
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
  const modal: ModalItem = useMemo(
    () => ({
      component,
      props: { ...props },
      options: setDefaults(options),
    }),
    [component, props]
  );

  const { createOrUpdateModal, openModal, closeModal, modals } = useContext(
    ModalContext
  );

  useEffect(() => {
    createOrUpdateModal(modal);
  }, [modal.component, modal.props]);

  const open = useCallback(() => openModal(modals.length), [modal]);
  const close = useCallback(() => closeModal(modals.length), [modal]);

  // as array so you can easily rename on caller
  return [open, close];
};
