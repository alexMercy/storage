import { Sidemenu } from '@/app/ui/Sidemenu/Sidemenu'
import { RightOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Grid, theme } from 'antd'
import AntdSider from 'antd/es/layout/Sider'
import { capitalize } from 'lodash'
import { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'

const { useToken } = theme

export const Sider: FC = () => {
  const { token } = useToken()
  const { t } = useTranslation()
  const screens = Grid.useBreakpoint()
  const [collapsed, setCollapsed] = useState(!screens.lg)
  const sidemenuWidth = [350, 150]

  return (
    <>
      <AntdSider
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(e) => setCollapsed(e)}
        width={sidemenuWidth[0]}
        collapsedWidth={sidemenuWidth[1]}
        css={css`
          position: fixed;
          padding: 25px;
          padding-left: 50px;
          min-height: calc(100dvh - ${token.Layout?.headerHeight}px);
        `}
      >
        <Sidemenu />

        <div
          css={css`
            display: flex;
            justify-content: center;
            margin-top: 24px;
          `}
        >
          <Button
            css={css`
              width: ${!collapsed ? '300px' : '150px'} !important;
            `}
            color="primary"
            variant={'filled'}
            icon={<RightOutlined rotate={!collapsed ? 180 : 0} />}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {/* TODO: add antd animation */}
            {!collapsed && capitalize(t('collapse'))}
          </Button>
        </div>
      </AntdSider>

      <div
        css={css`
          transition: width 0.2s;
          width: ${!screens.md ? 0 : sidemenuWidth[+collapsed]}px;
        `}
      ></div>
    </>
  )
}
