import { Resource, RESOURCE_TYPES } from '@/api/resource'
import { MimeIcon } from '@/shared'
import { useManageExplorerEvents } from '@/widget/Explorer'
import { FolderTwoTone } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Card, CardProps, GlobalToken, Grid, theme } from 'antd'
import { useCallback, type FC } from 'react'

interface CardIconProps {
  token: GlobalToken
  resource: Resource
  iconSize?: number
}

const CardIcon: FC<CardIconProps> = ({ token, resource, iconSize = 25 }) =>
  resource.type === RESOURCE_TYPES.FOLDER ? (
    <FolderTwoTone
      twoToneColor={token.colorPrimary}
      css={css({ fontSize: iconSize })}
    />
  ) : (
    <MimeIcon
      mimetype={resource.meta.mimetype}
      style={{ fontSize: iconSize }}
    />
  )

interface ResourceCardProps
  extends Omit<CardProps, 'key' | 'title' | 'resource' | 'children'> {
  resource: Resource
}
export const ResourceCard: FC<ResourceCardProps> = ({ resource, ...props }) => {
  const { token } = theme.useToken()
  const { md } = Grid.useBreakpoint()
  const { selectedResources } = useManageExplorerEvents()

  const isSelectedResource = useCallback(
    (uuid: string) => selectedResources.includes(uuid),
    [selectedResources]
  )

  return (
    <Card
      key={resource.uuid}
      {...props}
      hoverable
      css={css`
        width: ${md ? 250 : 200}px;
        height: ${md ? 150 : 150}px;
        user-select: none;
        border-width: 2px;
        ${isSelectedResource(resource.uuid) &&
        `
          border: 2px solid ${token.colorPrimaryBg};
          :hover {
            border: 2px solid ${token.colorPrimaryBg};
          }
          `}
      `}
      styles={{
        ...props.styles,
        ...{
          header: isSelectedResource(resource.uuid)
            ? {
                backgroundColor: token.colorPrimaryBg,
                color: token.colorPrimary,

                transition: ['color', 'background-color']
                  .map((prop) => `${prop} 0.2s ease-in-out`)
                  .join(', '),
              }
            : {
                transition: ['color', 'background-color']
                  .map((prop) => `${prop} 0.2s ease-in-out`)
                  .join(', '),
              },
        },
      }}
      title={
        <span
          css={css`
            text-overflow: ellipsis;
          `}
        >
          {resource.title}
        </span>
      }
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <CardIcon {...{ token, resource, iconSize: 45 }} />
      </div>
    </Card>
  )
}
