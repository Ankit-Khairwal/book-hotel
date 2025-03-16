import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { languages } from "./languages";

// Import language resources
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";

// Initialize resources object with available translations
const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

// Add placeholder translations for other languages
Object.keys(languages).forEach((langCode) => {
  if (!resources[langCode]) {
    resources[langCode] = {
      translation: enTranslation, // Use English as fallback
    };
  }
});

i18n
  // Load translation using http -> see /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: Object.keys(languages),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "preferredLanguage",
      caches: ["localStorage"],
    },
    react: {
      useSuspense: true,
    },
  });

// Function to dynamically add new languages
export const addLanguageResource = (lang, resource) => {
  i18n.addResourceBundle(lang, "translation", resource, true, true);
};

export default i18n;
