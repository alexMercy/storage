import { FolderResources, Resource, RESOURCE_TYPES } from '@/db/resource'
import { ResourceCard } from '@/entities/Resource'
import { useManageExplorerEvents } from '@/widget/Explorer/lib/useManageExplorerEvents'
import { css } from '@emotion/react'
import { useEffect, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ExplorerCardsProps {
  folder: FolderResources | undefined
}

export const ExplorerCards: FC<ExplorerCardsProps> = ({ folder }) => {
  const navigate = useNavigate()

  const {
    selectedResources,
    toggleSelectResource,
    clearSelectionResource,
    selectResources,
  } = useManageExplorerEvents()

  const onResourceDoubleClick = (resource: Resource) => {
    if (resource.type === RESOURCE_TYPES.FOLDER) {
      navigate(`/disk/${resource.uuid}`)
      clearSelectionResource()
    }
  }

  const onResourceClick = (event: React.MouseEvent, resource: Resource) => {
    if (!selectedResources.length || event.ctrlKey) {
      toggleSelectResource(resource.uuid)
    }
    if (selectedResources.length === 1 && !event.ctrlKey) {
      selectResources([resource.uuid])
    }
  }

  useEffect(() => {
    console.log(selectedResources)
  }, [selectedResources])

  return (
    <section
      css={css`
        display: flex;
        align-items: center;
        margin: 0 auto;
        flex-wrap: wrap;
        gap: 12px;
      `}
    >
      {folder?.resources.map((resource) => (
        <ResourceCard
          key={resource.uuid}
          resource={resource}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(event) => onResourceClick(event, resource)}
          onDoubleClick={() => onResourceDoubleClick(resource)}
        />
      ))}
    </section>
  )
}
