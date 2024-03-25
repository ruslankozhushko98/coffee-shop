import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './langs/en.json';
import ru from './langs/ru.json';

const resources = {
  en,
  ru,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
