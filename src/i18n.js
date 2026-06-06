import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        uz: {
            translation: {
            }
        },
        ru: {
            translation: {

            }
        },
        en: {
            translation: {

            }
        }
    },
    lng: "uz",        // default til
    fallbackLng: "uz", // til topilmasa
    interpolation: {
        escapeValue: false
    }
});

export default i18n;