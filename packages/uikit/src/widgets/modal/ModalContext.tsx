import React, { createContext, ReactNode } from "react";

export interface ModalOptions {
  disableBackdropClick: boolean;
}
export interface ModalProps {
  close: () => void;
}
export interface ModalItem {
  component: React.FC<ModalProps>;
  props: Record<string, unknown>;
  options: ModalOptions;
}
export interface ModalContextProps {
  openModal: (modal: ModalItem) => void;
  closeModal: (modal: ModalItem) => void;
  modals: ReactNode[];
}

export const ModalContext = createContext<ModalContextProps>({} as any);
