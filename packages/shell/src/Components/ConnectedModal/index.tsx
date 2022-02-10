import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalClose,
  useModal,
  DangerButton,
} from "@unifiprotocol/uikit";
import { useAdapter } from "../../Adapter";
import { WalletAction, WalletInfo } from "./Styles";
import { VscDebugDisconnect as DisconnectIcon } from "@unifiprotocol/uikit";

type ConnectedModalProps = {
  onClose: () => void;
};

const ConnectedModalComponent: React.FC<ConnectedModalProps> = ({
  onClose,
}) => {
  const { adapter, activeChain, disconnect } = useAdapter();
  const { t } = useTranslation();

  return (
    <Modal>
      <ModalHeader>
        Account
        <ModalClose onClick={() => onClose()} />
      </ModalHeader>
      <ModalBody>
        <div>You are connected using Metamask</div>
        <WalletInfo>
          <div>{adapter?.adapter.getAddress()}</div>
          <div>
            <span>Copy addreesss</span>
            <span>Explore addreesss</span>
          </div>
        </WalletInfo>
        <WalletAction>
          <DangerButton onClick={() => disconnect()}>
            <DisconnectIcon />
            Disconnect
          </DangerButton>
        </WalletAction>
      </ModalBody>
    </Modal>
  );
};

export const ConnectedModal: React.FC<
  ConnectedModalProps & { isOpen: boolean }
> = ({ onClose, isOpen }) => {
  const props = useMemo(() => ({ onClose }), [onClose]);
  const [open, close] = useModal({
    component: ConnectedModalComponent,
    props,
    options: { disableBackdropClick: true, onClose },
  });

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      close();
    }
  }, [isOpen, close, open]);

  return <></>;
};
