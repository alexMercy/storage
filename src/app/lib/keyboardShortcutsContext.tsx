import { createContext, useContext, useEffect, useRef } from 'react'

type KeyCombination = string
type Callback = () => void

const COMPLEX_SYMBOL = '+'

const EDITABLE_HTML_TAGS = ['INPUT', 'TEXTAREA']

export const getComplexKey = (...keys: string[]) => {
  return keys.join(COMPLEX_SYMBOL)
}

const KeyboardShortcutContext = createContext<{
  addShortcut: (keys: KeyCombination, callback: Callback) => void
  removeShortcut: (keys: KeyCombination) => void
}>({
  addShortcut: () => {},
  removeShortcut: () => {},
})

export const KeyboardShortcutProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const shortcuts = useRef<Map<KeyCombination, Callback>>(new Map())

  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement

    //Off hotkeys on input elements
    if (
      EDITABLE_HTML_TAGS.includes(target.tagName) ||
      target.isContentEditable
    ) {
      return
    }

    const isCtrlOrMeta = event.ctrlKey || event.metaKey

    const combination = [
      isCtrlOrMeta ? 'ctrl' : '',
      event.altKey ? 'alt' : '',
      event.shiftKey ? 'shift' : '',
      event.code.toLowerCase(),
    ]
      .filter(Boolean)
      .join(COMPLEX_SYMBOL)

    if (shortcuts.current.has(combination)) {
      event.preventDefault()
      shortcuts.current.get(combination)?.()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const addShortcut = (keys: KeyCombination, callback: Callback) => {
    shortcuts.current.set(keys.toLowerCase(), callback)
  }

  const removeShortcut = (keys: KeyCombination) => {
    shortcuts.current.delete(keys.toLowerCase())
  }

  return (
    <KeyboardShortcutContext.Provider value={{ addShortcut, removeShortcut }}>
      {children}
    </KeyboardShortcutContext.Provider>
  )
}

export const useKeyboardShortcut = () => {
  const context = useContext(KeyboardShortcutContext)
  if (!context) {
    throw new Error(
      'useKeyboardShortcut must be used within a KeyboardShortcutProvider'
    )
  }
  return context
}
