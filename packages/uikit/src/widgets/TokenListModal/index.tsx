import { Currency } from "@unifiprotocol/utils";
import React, { useCallback } from "react";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalHeader,
  ModalProps,
} from "../modal";
import { TokenList, TokenListProps } from "../../components/TokenList";

export type TokenListModalProps = TokenListProps & ModalProps;

export const TokenListModal: React.FC<TokenListModalProps> = ({
  onTokenSelected: parentOnTokenSelected,
  close,
  ...props
}) => {
  const onTokenSelected = useCallback(
    (token: Currency) => {
      parentOnTokenSelected(token);
      close();
    },
    [parentOnTokenSelected, close]
  );

  return (
    <Modal>
      <ModalHeader>
        Choose a token
        {close && <ModalClose onClick={close} />}
      </ModalHeader>
      <ModalBody>
        <TokenList onTokenSelected={onTokenSelected} {...props} />
      </ModalBody>
    </Modal>
  );
};
