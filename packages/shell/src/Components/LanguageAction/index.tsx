import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiWorld, SecondaryButton } from "@unifiprotocol/uikit";
import { LanguageModal } from "../LanguageModal";
import { LanguageActionWrapper } from "./Styles";

export const LanguageAction = () => {
  const [selectingLanguage, selectLanguage] = useState(false);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split("-")[0].toUpperCase();

  return (
    <>
      <SecondaryButton onClick={() => selectLanguage(true)}>
        <LanguageActionWrapper>
          <BiWorld />
          {currentLanguage}
        </LanguageActionWrapper>
      </SecondaryButton>
      <LanguageModal
        isOpen={selectingLanguage}
        onClose={() => selectLanguage(false)}
      />
    </>
  );
};
