import { KeyboardShortcutProvider } from '@/app/lib/keyboardShortcutsContext'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeyboardShortcutProvider>
      <App />
    </KeyboardShortcutProvider>
  </StrictMode>
)
