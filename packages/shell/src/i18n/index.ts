import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import { i18n } from "@unifiprotocol/utrade-v2-localization";

i18next.use(detector).init({
  resources: i18n.resources,
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["localStorage", "navigator"],
  },
});

export default i18next;
