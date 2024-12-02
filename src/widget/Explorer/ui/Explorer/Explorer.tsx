import { FolderResources } from '@/db/resource'
import {
  ExplorerViews,
  useManageExplorerEvents,
} from '@/widget/Explorer/lib/useManageExplorerEvents'
import { ExplorerCards } from '@/widget/Explorer/ui/ExplorerCards/ExplorerCards'
import { type FC } from 'react'

interface ExplorerProps {
  folder: FolderResources | undefined
}

export const Explorer: FC<ExplorerProps> = ({ folder }) => {
  const { viewType } = useManageExplorerEvents()
  return viewType === ExplorerViews.CARDS ? (
    <ExplorerCards folder={folder} />
  ) : (
    <>Explorer table works!</>
  )
}
