import { FolderResources, Resource, RESOURCE_TYPES } from '@/api/resource'
import { ResourceCard } from '@/entities/Resource'
import { css } from '@emotion/react'
import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ExplorerCardsProps {
  folder: FolderResources | undefined
}

export const ExplorerCards: FC<ExplorerCardsProps> = ({ folder }) => {
  const navigate = useNavigate()
  const [pressTimeout, setPressTimeout] = useState<NodeJS.Timeout | null>(null)

  const isPressed = !!pressTimeout

  const onResourceDoubleClick = (resource: Resource) => {
    if (resource.type === RESOURCE_TYPES.FOLDER) {
      navigate(`/disk/${resource.uuid}`)
    }
  }

  const onTouchStartResource = (resource: Resource) => {
    const timeout = setTimeout(() => {
      console.log('pressed mock')
      setPressTimeout(timeout)
    }, 1000)
  }

  const onTouchEndResource = (resource: Resource) => {
    if (isPressed) return // mock for select mode
    pressTimeout && clearTimeout(pressTimeout)
    setPressTimeout(null)
    onResourceDoubleClick(resource)
  }

  return (
    <section
      css={css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
      `}
    >
      {folder?.resources.map((resource) => (
        <ResourceCard
          key={resource.uuid}
          resource={resource}
          onContextMenu={(e) => e.preventDefault()}
          onDoubleClick={() => onResourceDoubleClick(resource)}
          onTouchStart={() => onTouchStartResource(resource)}
          onTouchEnd={() => onTouchEndResource(resource)}
        />
      ))}
    </section>
  )
}
