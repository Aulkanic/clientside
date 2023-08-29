import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language translations
import enTranslation from './en.translation.json';
import tlTranslation from './tl.translation.json';

// Define language resources
const resources = {
  en: { translation: enTranslation },
  tl: { translation: tlTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes output by default
  },
});

export default i18n;
