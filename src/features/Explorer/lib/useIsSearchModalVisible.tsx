import { create } from 'zustand'

interface IsSearchModalVisibleState {
  isSearch: boolean
}

interface IsSearchModalVisibleActions {
  setSearch: (value: boolean) => void
}

type IsSearchModalVisibleStore = IsSearchModalVisibleState &
  IsSearchModalVisibleActions

export const useIsSearchModalVisible = create<IsSearchModalVisibleStore>(
  (set) => ({
    isSearch: false,

    setSearch: (value) => set({ isSearch: value }),
  })
)
