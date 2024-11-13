import { Button, Card, ConfigProvider } from 'antd'
import { createContext, FC, useState } from 'react'
import { themes } from './app/lib/themes'

const themeCtx = createContext({
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
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <themeCtx.Provider value={{ toggleTheme }}>
          <Card>
            <Button type="primary" onClick={toggleTheme}>
              Test
            </Button>
          </Card>
        </themeCtx.Provider>
      </div>
    </ConfigProvider>
  )
}
