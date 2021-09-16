import React, { SyntheticEvent, useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { ModalItem } from ".";
import { ModalContext } from "./ModalContext";
import { ModalOverlay } from "./Modal";

export const ModalProvider: React.FC = ({ children }) => {
  const theme = useTheme();

  const [modals, setModals] = useState<Array<ModalItem>>([]);

  const openModal = useCallback(
    (modal: ModalItem) => {
      setModals((modals) => {
        return [...modals, modal];
      });
    },
    [setModals]
  );

  const closeModal = useCallback(
    (id: number) => {
      setModals((modals) => {
        const copy = [...modals];
        copy.splice(id, 1);
        return copy;
      });
    },
    [setModals]
  );

  const onBackdropClick = useCallback(
    (evt: SyntheticEvent) => {
      const clickingOverlay = evt.currentTarget === evt.target;
      const clickingWrapper =
        evt.currentTarget === (evt.target as any).parentElement;
      const clickingBackdrop = clickingOverlay || clickingWrapper;

      const lastModalHasBackdropEnabled = !modals[modals.length - 1].options
        .disableBackdropClick;

      if (clickingBackdrop && lastModalHasBackdropEnabled) {
        closeModal(modals.length - 1);
      }
    },
    [modals]
  );

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        modals,
      }}
    >
      {children}

      {modals.map(({ component: ModalComponent, props }, idx) => (
        <ModalOverlay
          onClick={onBackdropClick}
          key={idx}
          style={{ zIndex: theme.zIndex.modal + idx }}
        >
          <ModalComponent {...props} close={() => closeModal(idx)} />
        </ModalOverlay>
      ))}
    </ModalContext.Provider>
  );
};
