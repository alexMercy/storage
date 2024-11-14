import { createContext } from 'react'

export const themeCtx = createContext({
  themePreset: '',
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
