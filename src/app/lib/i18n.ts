import { en } from '@/app/lib/locales/en'
import { ru } from '@/app/lib/locales/ru'
import enUS from 'antd/es/locale/en_US'
import ruRU from 'antd/es/locale/ru_RU'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      antd: enUS,
      ...en,
    },
  },
  ru: {
    translation: {
      antd: ruRU,
      ...ru,
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  saveMissing: false,
})

export const getAntdLocale = () => {
  return i18n.t('antd', { returnObjects: true })
}

export default i18n
