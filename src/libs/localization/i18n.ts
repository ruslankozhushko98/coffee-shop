import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKeys, LANGS } from 'libs/utils/constants';
import en from './langs/en.json';
import ru from './langs/ru.json';

const resources = {
  en,
  ru,
};

export const languages: Array<string> = Object.keys(resources);

(async () => {
  const lang: string | null = await AsyncStorage.getItem(AsyncStorageKeys.lang);

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: lang || LANGS.EN,
    interpolation: {
      escapeValue: false,
    },
  });
})();

export default i18n;
