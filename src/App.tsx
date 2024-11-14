import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { getAntdLocale } from '@/app/lib/i18n'
import { ConfigProvider } from 'antd'
import { Locale } from 'antd/es/locale'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { themes } from './app/lib/themes'
import { AppLayout } from './app/ui/Layout/Layout'

export const App: FC = () => {
  const { i18n } = useTranslation()
  const [themePreset, setTheme] = useState('dark')
  const [locale, setLocale] = useState(getAntdLocale())

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleLocale = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(newLang)
    setLocale(getAntdLocale())
  }

  document.documentElement.setAttribute('data-theme', themePreset)

  return (
    <ConfigProvider theme={themes[themePreset]} locale={locale as Locale}>
      <themeCtx.Provider value={{ toggleTheme, themePreset }}>
        <localeCtx.Provider value={{ toggleLocale, locale: i18n.language }}>
          <AppLayout />
        </localeCtx.Provider>
      </themeCtx.Provider>
    </ConfigProvider>
  )
}
