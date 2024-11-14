import { createContext } from 'react'

export const themeCtx = createContext({
  isDark: false,
  toggleTheme: () => {
    return
  },
})
export const localeCtx = createContext({
  locale: '',
  toggleLocale: () => {
    return
  },
})
