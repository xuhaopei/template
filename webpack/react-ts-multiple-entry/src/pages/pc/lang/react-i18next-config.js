import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { query } from 'src/util/index'
import { LANGUAGE } from 'src/constants/index'
export const createResources = (arrLanguage = []) =>
  arrLanguage.reduce(
    (resources, language) => ({
      ...resources,
      [language]: {
        translation: require(`./locales/${language}.json`),
      },
    }),
    {},
  )

export const LANGUAGES = {
  zh_CN: '🇨🇳 Chinese',
  en: '🇺🇸 English',
  es: 'Spanish',
}

export const resources = createResources(Object.keys(LANGUAGES))
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default locale
    lng: LANGUAGE,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    },
  })

export default i18n
