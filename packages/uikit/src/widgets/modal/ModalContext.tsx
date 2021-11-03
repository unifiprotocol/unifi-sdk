import React, { createContext, ReactNode } from "react";

export interface ModalOptions {
  disableBackdropClick?: boolean;
  onClose?: () => void;
}

export interface ModalProps {
  close: () => void;
}

export interface NewModalItem<T> {
  component: React.FC<T>;
  props: Omit<T, "close">;
  options?: ModalOptions;
}

export interface ModalItem<T extends ModalProps = any> {
  component: React.FC<T>;
  props: T;
  options: ModalOptions;
  id: string;
}

export interface ModalContextProps {
  createOrUpdateModal: (modal: ModalItem) => void;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  deleteModal: (id: string) => void;
  modals: ReactNode[];
}

export const ModalContext = createContext<ModalContextProps>({} as any);
