import React, { createContext, ReactNode } from "react";

export interface ModalOptions {
  disableBackdropClick: boolean;
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
}

export interface ModalContextProps {
  createOrUpdateModal: (modal: ModalItem) => void;
  openModal: (id: number) => void;
  closeModal: (id: number) => void;
  modals: ReactNode[];
}

export const ModalContext = createContext<ModalContextProps>({} as any);
