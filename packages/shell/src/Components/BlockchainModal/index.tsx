import React, { useEffect, useMemo } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalClose,
  useModal,
} from "@unifiprotocol/uikit";
import config, { IConfig } from "../../Config";
import {
  ItemLogo,
  ItemName,
  SelectionList,
  SelectionListItem,
} from "../ConnectionModal/Styles";

type ChooseBlockchainModalProps = {
  onNetworkChange: (network: IConfig) => void;
  onClose: () => void;
};

const BlockchainModalComponent: React.FC<ChooseBlockchainModalProps> = ({
  onClose,
  onNetworkChange,
}) => {
  const options = useMemo(
    () =>
      config.map((network) => ({
        value: network,
        display: (
          <>
            <ItemLogo alt={network.blockchain} src={network.logoURI} />
            <ItemName>{network.blockchain}</ItemName>
          </>
        ),
      })),
    []
  );

  return (
    <Modal>
      <ModalHeader>
        Choose the fukin netwrok stupid muggle
        <ModalClose onClick={() => onClose()} />
      </ModalHeader>
      <ModalBody>
        {/* <Trans
          i18nKey="choose_network_modal.currently_browsing" // optional -> fallbacks to defaults if not provided
          values={{ networkName: activeChain.blockchain }}
          components={{ b: <b /> }}
        /> */}
        <SelectionList>
          {options.map(({ value, display }, idx) => {
            return (
              <SelectionListItem
                key={idx}
                onClick={() => onNetworkChange(value)}
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

export const BlockchainModal: React.FC<
  ChooseBlockchainModalProps & { isOpen: boolean }
> = ({ onClose, isOpen, onNetworkChange }) => {
  const props = useMemo(
    () => ({ onNetworkChange, onClose }),
    [onNetworkChange, onClose]
  );
  const [open, close] = useModal({
    component: BlockchainModalComponent,
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
