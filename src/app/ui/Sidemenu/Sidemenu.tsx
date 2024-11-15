import { localeCtx, themeCtx } from '@/app/lib/core-context'
import {
  DatabaseOutlined,
  DeleteOutlined,
  MoonOutlined,
  RightOutlined,
  SunOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Card, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { capitalize } from 'lodash'
import { useContext, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const { useToken } = theme
export const Sidemenu: FC = () => {
  const { token } = useToken()
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { toggleTheme, isDark } = useContext(themeCtx)
  const { locale, toggleLocale } = useContext(localeCtx)

  const sidemenuWidth = [350, 150]
  const navItems: ItemType<MenuItemType>[] = [
    {
      key: 'disk',
      label: capitalize(t('disk')),
      icon: <DatabaseOutlined />,
      onClick: () => navigate('/disk'),
    },
    {
      key: 'trash',
      label: capitalize(t('trash')),
      icon: <DeleteOutlined />,
      onClick: () => navigate('/trash'),
    },
    { type: 'divider' },
    {
      key: 'theme',
      label: capitalize(t('theme')),
      icon: !isDark ? <SunOutlined /> : <MoonOutlined />,
      onClick: toggleTheme,
    },
    {
      key: 'translate',
      label: locale.toUpperCase(),
      icon: <TranslationOutlined />,
      onClick: toggleLocale,
    },
  ]

  return (
    <>
      <Sider
        collapsed={collapsed}
        width={sidemenuWidth[0]}
        collapsedWidth={sidemenuWidth[1]}
        css={css`
          position: fixed;
          padding: 25px;
          padding-left: 50px;
          min-height: calc(100dvh - ${token.Layout?.headerHeight}px);
        `}
      >
        <Card
          css={css`
            .ant-card-body {
              padding: 0;
            }
          `}
        >
          <Menu
            mode="inline"
            css={css`
              border-radius: 16px;
              min-height: 500px;
              border-inline-end: 0 !important;
            `}
            items={navItems}
          />
        </Card>

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
      </Sider>
      <div
        css={css`
          transition: width 0.2s;
          width: ${sidemenuWidth[+collapsed]}px;
        `}
      ></div>
    </>
  )
}
