import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import global_es from './locales/es/translation.json'
import global_en from './locales/en/translation.json'

const idioma = localStorage.getItem('i18nextLng')

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                global: global_en,

            },
            es: {
                global: global_es,
            }
        }
    });

i18n.changeLanguage(idioma == 'en'? 'en':'es');