import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalClose,
  useModal,
  DangerButton,
  CgCopy,
  CgLink,
  VscDebugDisconnect as DisconnectIcon,
} from "@unifiprotocol/uikit";
import { BlockchainScanExplorers } from "@unifiprotocol/utils";
import { useAdapter } from "../../Adapter";
import {
  ConnectedWalletAction,
  ConnectedWalletActions,
  WalletAction,
  WalletAddress,
  WalletInfo,
} from "./Styles";
import useCopy from "@react-hook/copy";

type ConnectedModalProps = {
  onClose: () => void;
};

const ConnectedModalComponent: React.FC<ConnectedModalProps> = ({
  onClose,
}) => {
  const { adapter, connector, activeChain, disconnect } = useAdapter();
  console.log("🚀 ~ file: index.tsx ~ line 33 ~ activeChain", activeChain);
  const { t } = useTranslation();
  const { copy } = useCopy(adapter?.adapter.getAddress() ?? "");

  const onDisconnect = useCallback(() => {
    disconnect();
    onClose();
  }, [disconnect, onClose]);

  return (
    <Modal>
      <ModalHeader>
        {t("connected_modal.account")}
        <ModalClose onClick={() => onClose()} />
      </ModalHeader>
      <ModalBody>
        <div>
          {t("connected_modal.using_wallet", { wallet: connector.displayName })}
        </div>
        <WalletInfo>
          <WalletAddress>{adapter?.adapter.getAddress()}</WalletAddress>
          <ConnectedWalletActions>
            <ConnectedWalletAction onClick={copy}>
              <CgCopy /> {t("connected_modal.copy_address")}
            </ConnectedWalletAction>
            <ConnectedWalletAction
              onClick={() =>
                window.open(
                  BlockchainScanExplorers[activeChain.blockchain].address(
                    adapter?.adapter.getAddress() ?? ""
                  )
                )
              }
            >
              <CgLink /> {t("connected_modal.view_on_explorer")}
            </ConnectedWalletAction>
          </ConnectedWalletActions>
        </WalletInfo>
        <WalletAction>
          <DangerButton onClick={onDisconnect}>
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
