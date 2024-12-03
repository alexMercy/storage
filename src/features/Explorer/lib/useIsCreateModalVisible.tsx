import { create } from 'zustand'

interface IsCreateModalVisibleState {
  isCreateOpen: boolean
}

interface IsCreateModalVisibleActions {
  setIsCreateOpen: (value: boolean) => void
}

type IsCreateModalVisibleStore = IsCreateModalVisibleState &
  IsCreateModalVisibleActions

export const useIsCreateModalVisible = create<IsCreateModalVisibleStore>(
  (set) => ({
    isCreateOpen: false,

    setIsCreateOpen: (value) => set({ isCreateOpen: value }),
  })
)
