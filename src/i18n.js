import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationRU from "./locales/ru/translationRU.json"
import translationKY from "./locales/ky/translationKY.json"
import translationKZ from "./locales/kz/translationKZ.json"

import axios from "axios"


// the translations
// (tip move them in a JSON file and import them)
const resources = {
  ru: {
    translation: translationRU
  },
  ky: {
    translation: translationKY
  },
  kz: {
    translation: translationKZ
  }
};

// async function location() {
//   try {
//     const response = await axios.get('https://ipapi.co/json/');
//     console.log(response.data.country)
//     if(response.data.country == "RU") {
//       console.log("RU")
//       return "ru"
//     }
//     if(response.data.country == "KG") {
//       console.log("KY")
//       return "ky"
//     }
//     if(response.data.country == "KZ") {
//       console.log("KZ")
//       return "kz"
//     }
//     return "ru"
//   } catch (error) {
//     console.error(error);
//   }
// }


// const country = location().then(response => i18n.changeLanguage(response));

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    // fallbackLng: 'ru-RU',
    fallbackLng: 'ru',
    
    
    keySeparator: '.', // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;