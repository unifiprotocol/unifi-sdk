import styled from "styled-components";
import { Themed } from "../../themes/types";

export const ModalOverlay = styled.div<Themed>`
  z-index: ${(p) => p.theme.zIndex.modal};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Modal = styled.div<{ centered?: boolean }>`
  position: relative;
  max-width: 500px; // TODO: parametrize in ModalOptions
  margin: 1.75rem auto;
  ${(p) =>
    p.centered &&
    `

  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100% - (1.75rem * 2));
  & > * {
    width: 100%;
  }`}
`;
