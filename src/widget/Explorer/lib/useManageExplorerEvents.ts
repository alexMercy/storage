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
  clearSelectionResource: () => void
  toggleSelectResource: (uuid: string) => void
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
    selectResources: (resourceUuids) => {
      set({ selectedResources: resourceUuids })
    },
    clearSelectionResource: () => {
      set({ selectedResources: [] })
    },
    toggleSelectResource: (uuid: string) => {
      set(({ selectedResources }) => {
        let resourceUuids: string[] = []
        const uuidIndex = selectedResources.indexOf(uuid)
        console.log(uuidIndex)
        if (uuidIndex === -1) {
          resourceUuids = [...selectedResources, uuid]
        } else {
          selectedResources.splice(uuidIndex, 1)
          resourceUuids = selectedResources
        }
        return { selectedResources: resourceUuids }
      })
    },

    selectViewType: (viewType) => set({ viewType }),
  })
)
