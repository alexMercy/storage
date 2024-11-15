import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { THEMES } from '@/app/lib/core-enums'
import {
  DatabaseOutlined,
  DeleteOutlined,
  MoonOutlined,
  SunOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import { Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { capitalize } from 'lodash'
import { useContext, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

export const Sidemenu: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleTheme, isDark } = useContext(themeCtx)
  const { locale, toggleLocale } = useContext(localeCtx)

  const selectedKey = location.pathname.slice(1).split('/')[0]

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
      label: capitalize(t(`theme.${[THEMES.LIGHT, THEMES.DARK][+isDark]}`)),
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
    <Menu
      mode="inline"
      css={css`
        border-radius: 16px;
        min-height: 500px;
        border-inline-end: 0 !important;
      `}
      selectable={false}
      selectedKeys={[selectedKey]}
      items={navItems}
    />
  )
}
