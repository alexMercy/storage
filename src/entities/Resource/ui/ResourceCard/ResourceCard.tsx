import { Resource, RESOURCE_TYPES } from '@/api/resource'
import { MimeIcon } from '@/shared'
import { FolderTwoTone } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Card, CardProps, GlobalToken, theme } from 'antd'
import type { FC } from 'react'

interface CardIconProps {
  token: GlobalToken
  resource: Resource
}

const CardIcon: FC<CardIconProps> = ({ token, resource }) => (
  <div>
    {resource.type === RESOURCE_TYPES.FOLDER ? (
      <FolderTwoTone
        twoToneColor={token.colorPrimary}
        css={css({ fontSize: 25 })}
      />
    ) : (
      <MimeIcon mimetype={resource.meta.mimetype} style={{ fontSize: 25 }} />
    )}

    <span>{resource.type}</span>
  </div>
)

interface ResourceCardProps
  extends Omit<CardProps, 'key' | 'title' | 'resource' | 'children'> {
  resource: Resource
}
export const ResourceCard: FC<ResourceCardProps> = ({ resource, ...props }) => {
  const { token } = theme.useToken()

  return (
    <Card
      key={resource.uuid}
      hoverable
      css={css`
        width: 250px;
        height: 150px;
      `}
      {...props}
      title={<CardIcon {...{ token, resource }} />}
    >
      {resource.title}
    </Card>
  )
}
