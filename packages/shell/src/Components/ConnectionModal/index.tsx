import React, { useCallback, useEffect, useMemo } from "react";
import {
  Connectors,
  getBlockchainWalletConnectors,
} from "@unifiprotocol/core-sdk";
import { ItemLogo, ItemName, SelectionList, SelectionListItem } from "./Styles";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalClose,
  useModal,
} from "@unifiprotocol/uikit";
import { useAdapter } from "../../Adapter";
import { getWalletIcon } from "../../Adapter/Wallets";
import { setStorageKey } from "../../Utils/ChainStorage";

type ConnectionModalProps = {
  onClose: () => void;
  onConnectionError: (error: Error) => void;
  onConnect: () => void;
};

const ConnectionModalComponent: React.FC<ConnectionModalProps> = ({
  onClose,
  onConnectionError,
  onConnect,
}) => {
  const { connect, activeChain } = useAdapter();
  const { t } = useTranslation();

  const availableWallets = getBlockchainWalletConnectors(
    activeChain.blockchain
  );

  const options = availableWallets.map((wallet) => {
    return {
      value: wallet.name,
      display: (
        <>
          <ItemLogo src={getWalletIcon(wallet.name)} alt={wallet.displayName} />
          <ItemName>{wallet.displayName}</ItemName>
        </>
      ),
    };
  });

  const onWalletSelected = useCallback(
    (connectorName: Connectors) =>
      connect(connectorName)
        .then(() => {
          setStorageKey(activeChain.blockchain, "CONNECTOR", connectorName);
          onConnect();
        })
        .catch((error) => {
          onConnectionError(error);
        }),
    [activeChain.blockchain, connect, onConnect, onConnectionError]
  );

  return (
    <Modal>
      <ModalHeader>
        {t("connection_modal.connect")}
        <ModalClose onClick={() => onClose()} />
      </ModalHeader>
      <ModalBody>
        {t("connection_modal.select_a_wallet")}
        <SelectionList>
          {options.map(({ value, display }, idx) => {
            return (
              <SelectionListItem
                key={idx}
                onClick={() => onWalletSelected(value as any)}
              >
                {display}
              </SelectionListItem>
            );
          })}
        </SelectionList>
      </ModalBody>
    </Modal>
  );
};

export const ConnectionModal: React.FC<
  ConnectionModalProps & { isOpen: boolean }
> = ({ onClose, onConnectionError, onConnect, isOpen }) => {
  const props = useMemo(
    () => ({ onClose, onConnectionError, onConnect }),
    [onClose, onConnectionError, onConnect]
  );
  const [open, close] = useModal({
    component: ConnectionModalComponent,
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
