import { useResources } from '@/api/resources'
import { css } from '@emotion/react'
import { Button, Card } from 'antd'
import { useState, type FC } from 'react'

export const DiskPage: FC = () => {
  const [uuid, setUuid] = useState('root')
  const { data: root } = useResources(uuid)

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 12px;
      `}
    >
      {root?.parentPath.length && root?.parentPath.length > 1 && (
        <Button
          onClick={() => setUuid(root.parentPath[root.parentPath.length - 2])}
        >
          Back
        </Button>
      )}
      {root?.resources.map((resource) => (
        <Card
          key={resource.uuid}
          css={css`
            width: 250px;
            height: 150px;
          `}
          onClick={() => setUuid(resource.uuid)}
          title={resource.type}
        >
          {resource.title}
        </Card>
      ))}
    </div>
  )
}
