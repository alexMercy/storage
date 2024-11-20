import { create } from 'zustand'

export enum ExplorerViews {
  CARDS = 'cards',
  TABLE = 'table',
}

interface ManageExplorerEventsState {
  selectedResources: string[]
  viewType: ExplorerViews
}

interface ManageExplorerEventsActions {
  selectResources: (resources: string[]) => void
  selectViewType: (type: ExplorerViews) => void
}

type ManageExplorerEventsStore = ManageExplorerEventsState &
  ManageExplorerEventsActions

export const useManageExplorerEvents = create<ManageExplorerEventsStore>(
  (set) => ({
    //state
    selectedResources: [],
    viewType: ExplorerViews.CARDS,

    //actions
    selectResources: (resources) => {
      set({ selectedResources: resources })
    },
    selectViewType: (viewType) => set({ viewType }),
  })
)
