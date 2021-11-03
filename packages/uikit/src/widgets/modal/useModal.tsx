import { useContext, useCallback, useEffect, useMemo } from "react";
import { ModalItem, ModalOptions, NewModalItem } from ".";
import { ModalContext } from "./ModalContext";

const defaultOptions = {
  disableBackdropClick: false,
};
const defaultProps: any = {};
const setDefaults = (options: Partial<ModalOptions> = {}): ModalOptions => {
  return {
    ...defaultOptions,
    ...options,
  };
};
type OpenFn = () => void;
type CloseFn = () => void;
type DeleteFn = () => void;

export const useModal = <T extends any = void>({
  component,
  props = defaultProps,
  options = { ...defaultOptions },
}: NewModalItem<T>): [OpenFn, CloseFn] => {
  const id = useMemo(() => Math.random().toString(36).substr(2, 5), []);
  const modal: ModalItem = useMemo(
    () => ({
      component,
      props: { ...props },
      options: setDefaults(options),
      id,
    }),
    [component, props]
  );

  const {
    createOrUpdateModal,
    openModal,
    closeModal,
    deleteModal,
  } = useContext(ModalContext);

  useEffect(() => {
    createOrUpdateModal(modal);
    return () => {
      deleteModal(modal.id);
    };
  }, []);

  useEffect(() => {
    createOrUpdateModal(modal);
  }, [modal.props]);

  const open = useCallback(() => openModal(modal.id), [modal.id]);
  const close = useCallback(() => {
    options.onClose && options.onClose();
    closeModal(modal.id);
  }, [modal.id]);

  // as array so you can easily rename on caller
  return [open, close];
};
