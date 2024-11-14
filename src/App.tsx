import { ConfigProvider } from 'antd'
import { createContext, FC, useState } from 'react'
import { themes } from './app/lib/themes'
import { AppLayout } from './app/ui/Layout/Layout'

export const themeCtx = createContext({
  themePreset: '',
  toggleTheme: () => {
    return
  },
})

export const App: FC = () => {
  const [themePreset, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  document.documentElement.setAttribute('data-theme', themePreset)

  return (
    <ConfigProvider theme={themes[themePreset]}>
      <themeCtx.Provider value={{ toggleTheme, themePreset }}>
        <AppLayout />
      </themeCtx.Provider>
    </ConfigProvider>
  )
}
