import React, { SyntheticEvent, useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { ModalItem } from ".";
import { ModalContext } from "./ModalContext";
import { ModalOverlay } from "./Modal";

export const ModalProvider: React.FC = ({ children }) => {
  const theme = useTheme();

  const [modals, setModals] = useState<Array<ModalItem>>([]);
  const [openedModals, setOpenedModals] = useState<number[]>([]);

  const createOrUpdateModal = useCallback(
    (newModal: ModalItem) => {
      setModals((_modals) => {
        let updated = false;

        const modals = _modals.map((m) => {
          // We are suposed to not stake the same modal twice
          if (m.component === newModal.component) {
            m.props = newModal.props;
            updated = true;
          }
          return m;
        });

        if (updated) {
          return modals;
        }

        return [...modals, newModal];
      });
    },
    [setModals]
  );

  const closeModal = useCallback(
    (closeId: number) => {
      setOpenedModals((openedModals) =>
        openedModals.filter((modalId) => modalId !== closeId)
      );
    },
    [setOpenedModals]
  );

  const openModal = useCallback(
    (id: number) => {
      setOpenedModals((openedModals) => [...openedModals, id]);
    },
    [setOpenedModals]
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
        createOrUpdateModal,
        openModal,
        closeModal,
        modals,
      }}
    >
      {children}

      {openedModals.length > 0 &&
        modals.map(
          ({ component: ModalComponent, props }, idx) =>
            openedModals.includes(idx) && (
              <ModalOverlay
                onClick={onBackdropClick}
                key={idx}
                style={{ zIndex: theme.zIndex.modal + idx }}
              >
                <ModalComponent {...props} close={() => closeModal(idx)} />
              </ModalOverlay>
            )
        )}
    </ModalContext.Provider>
  );
};
