import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { LOCALES, THEMES } from '@/app/lib/core-enums'
import { getAntdLocale } from '@/app/lib/i18n'
import { router } from '@/app/routes'
import { ConfigProvider } from 'antd'
import { Locale } from 'antd/es/locale'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import { themes } from './app/lib/themes'

export const App: FC = () => {
  const { i18n } = useTranslation()
  const [themePreset, setTheme] = useState(THEMES.DARK)
  const [locale, setLocale] = useState(getAntdLocale())

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT))
  }

  const toggleLocale = () => {
    const newLang = i18n.language === LOCALES.EN ? LOCALES.RU : LOCALES.EN
    i18n.changeLanguage(newLang)
    setLocale(getAntdLocale())
  }

  document.documentElement.setAttribute('data-theme', themePreset)

  return (
    <ConfigProvider theme={themes[themePreset]} locale={locale as Locale}>
      <themeCtx.Provider
        value={{ toggleTheme, isDark: themePreset === THEMES.DARK }}
      >
        <localeCtx.Provider value={{ toggleLocale, locale: i18n.language }}>
          <RouterProvider router={router} />
        </localeCtx.Provider>
      </themeCtx.Provider>
    </ConfigProvider>
  )
}
