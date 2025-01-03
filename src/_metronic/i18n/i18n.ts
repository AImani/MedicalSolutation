import i18next, { use } from 'i18next'
import faMessages from './messages/fa.json'
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'fa';
console.log('faMessages > ', faMessages);

i18next
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: faMessages,
      },
    },
    lng: 'fa',
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next