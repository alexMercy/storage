import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { LOCALES, THEMES } from '@/app/lib/core-enums'
import { getAntdLocale } from '@/app/lib/i18n'
import {
  getComplexKey,
  useKeyboardShortcut,
} from '@/app/lib/keyboardShortcutsContext'
import { useScreensHelper } from '@/app/lib/useScreensHelper'
import { router } from '@/app/routes'
import {
  useIsCreateModalVisible,
  useIsSearchModalVisible,
} from '@/features/Explorer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import { themes } from './app/lib/themes'

const queryClient = new QueryClient()

export const App: FC = () => {
  const { addShortcut, removeShortcut } = useKeyboardShortcut()

  const { i18n } = useTranslation()
  const [themePreset, setTheme] = useState(THEMES.LIGHT)
  const [locale, setLocale] = useState(getAntdLocale())
  const { setSearch } = useIsSearchModalVisible()
  const { setIsCreateOpen } = useIsCreateModalVisible()

  useScreensHelper()

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT))
  }

  const toggleLocale = () => {
    const newLang = i18n.language === LOCALES.EN ? LOCALES.RU : LOCALES.EN
    i18n.changeLanguage(newLang)
    setLocale(getAntdLocale())
  }

  useEffect(() => {
    const keyDownMap = [
      {
        keys: getComplexKey('Ctrl', 'KeyK'),
        callback: () => setSearch(true),
      },
      {
        keys: getComplexKey('Ctrl', 'KeyP'),
        callback: () => setIsCreateOpen(true),
      },
      {
        keys: getComplexKey('Ctrl', 'KeyO'),
        callback: () => toggleTheme(),
      },
      {
        keys: getComplexKey('Ctrl', 'KeyL'),
        callback: () => toggleLocale(),
      },
    ]
    keyDownMap.forEach(({ keys, callback }) => addShortcut(keys, callback))
    return () => {
      keyDownMap.forEach(({ keys }) => removeShortcut(keys))
    }
  }, [])

  document.documentElement.setAttribute('data-theme', themePreset)

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themes[themePreset]} locale={locale}>
        <themeCtx.Provider
          value={{ toggleTheme, isDark: themePreset === THEMES.DARK }}
        >
          <localeCtx.Provider value={{ toggleLocale, locale: i18n.language }}>
            <RouterProvider router={router} />
          </localeCtx.Provider>
        </themeCtx.Provider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}
