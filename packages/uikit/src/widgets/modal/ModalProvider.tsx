import React, { SyntheticEvent, useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { ModalItem } from ".";
import { ModalContext } from "./ModalContext";
import { ModalOverlay } from "./Modal";
import { stringify } from "flatted";

export const ModalProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  const [modals, setModals] = useState<Array<ModalItem>>([]);
  const [openedModals, setOpenedModals] = useState<string[]>([]);

  const createOrUpdateModal = useCallback(
    (newModal: ModalItem) => {
      setModals((_modals) => {
        const findModal = _modals.find((m) => m.id === newModal.id);
        if (findModal && stringify(findModal) !== stringify(newModal)) {
          findModal.props = newModal.props;
          findModal.options = newModal.options;
          return [..._modals];
        } else if (findModal) {
          return _modals;
        }
        return [..._modals, newModal];
      });
    },
    [setModals]
  );

  const closeModal = useCallback(
    (closeId: string) => {
      setOpenedModals((openedModals) =>
        openedModals.filter((modalId) => modalId !== closeId)
      );
    },
    [setOpenedModals]
  );

  const deleteModal = useCallback(
    (closeId: string) => {
      setModals((modals) => modals.filter((m) => m.id !== closeId));
    },
    [setModals]
  );

  const openModal = useCallback(
    (id: string) => {
      setOpenedModals((st) => [...st, id]);
    },
    [setOpenedModals, openedModals]
  );

  const onBackdropClick = useCallback(
    (evt: SyntheticEvent, id: ModalItem["id"]) => {
      const modal = modals.find((m) => m.id === id);
      if (!modal) return;
      const clickingOverlay = evt.currentTarget === evt.target;
      const clickingWrapper =
        evt.currentTarget === (evt.target as any).parentElement;
      const clickingBackdrop = clickingOverlay || clickingWrapper;
      const modalHasBackdropEnabled = modal.options.disableBackdropClick;
      if (clickingBackdrop && modalHasBackdropEnabled) {
        modal.options.onClose && modal.options.onClose();
        closeModal(modal.id);
      }
    },
    [closeModal, modals]
  );

  return (
    <ModalContext.Provider
      value={{
        createOrUpdateModal,
        openModal,
        closeModal,
        deleteModal,
        modals,
      }}
    >
      {children}

      {openedModals.length > 0 &&
        openedModals.map((id, idx) => {
          const modal = modals.find((m) => m.id === id);
          if (!modal) return null;
          const { props, component: ModalComponent } = modal;
          return (
            <ModalOverlay
              onClick={(evt: SyntheticEvent) => onBackdropClick(evt, id)}
              key={id}
              style={{ zIndex: theme.zIndex.modal + idx }}
            >
              <ModalComponent {...props} close={() => closeModal(id)} />
            </ModalOverlay>
          );
        })}
    </ModalContext.Provider>
  );
};
