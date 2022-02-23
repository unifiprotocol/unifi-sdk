import {
  Modal,
  ModalBody,
  ModalClose,
  ModalHeader,
  useModal,
} from "@unifiprotocol/uikit";
import { availableLanguages } from "@unifiprotocol/utrade-v2-localization";
import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ItemName,
  SelectionList,
  SelectionListItem,
} from "../ConnectionModal/Styles";

type ChooseLanguageModalProps = { onClose: () => void; isOpen: boolean };

const LanguageModalComponent: React.FC<
  Pick<ChooseLanguageModalProps, "onClose">
> = ({ onClose }) => {
  const { t, i18n } = useTranslation();

  const options = Object.values(availableLanguages).map((lang) => ({
    value: lang.locale,
    display: (
      <>
        <ItemName>{lang.name}</ItemName>
      </>
    ),
  }));

  const onLanguageChange = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
      onClose();
    },
    [i18n, onClose]
  );

  return (
    <Modal>
      <ModalHeader>
        {t("choose_language_modal.select_language")}
        <ModalClose onClick={() => onClose()} />
      </ModalHeader>
      <ModalBody>
        <SelectionList style={{ marginTop: "0" }}>
          {options.map(({ value, display }, idx) => {
            return (
              <SelectionListItem
                key={idx}
                onClick={() => onLanguageChange(value)}
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

export const LanguageModal: React.FC<ChooseLanguageModalProps> = ({
  onClose,
  isOpen,
}) => {
  const props = useMemo(() => ({ onClose, isOpen }), [onClose, isOpen]);
  const [open, close] = useModal({
    component: LanguageModalComponent,
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
