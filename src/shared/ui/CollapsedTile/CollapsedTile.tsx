import { HotKeyTag } from '@/shared/ui/HotKeyTag/HotKeyTag'
import { css } from '@emotion/react'
import { Button, ButtonProps, Tooltip } from 'antd'
import { FC, ReactNode } from 'react'

interface CollapsedTileProps {
  collapsed: boolean
  hotKeyText: string
  text?: ReactNode | string
  icon?: ReactNode
  antButtonProps?: Omit<ButtonProps, 'icon'>
  onClick: () => unknown
}

export const CollapsedTile: FC<CollapsedTileProps> = ({
  collapsed,
  icon,
  text,
  hotKeyText,
  antButtonProps,
  onClick,
}) => {
  return (
    <Tooltip title={text}>
      <Button
        block
        type="primary"
        onClick={onClick}
        css={css({
          width: collapsed ? '' : `47% !important`,
          height: 60,
          border: 'none',
        })}
        {...antButtonProps}
      >
        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 5,
          })}
        >
          <div
            css={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -5,
              transition: 'margin .2s ease',
            })}
          >
            {icon}
          </div>
          <HotKeyTag text={hotKeyText} />
        </div>
      </Button>
    </Tooltip>
  )
}
