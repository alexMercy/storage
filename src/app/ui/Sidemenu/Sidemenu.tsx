import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { SIDEMENU_ITEMS, THEMES } from '@/app/lib/core-enums'
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
import { MenuProps } from 'rc-menu'
import { useContext, useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

const menuCss = css`
  border-radius: 16px;
  min-height: 500px;
  border-inline-end: 0 !important;
`

interface SidemenuProps {
  onSelect?: MenuProps['onClick']
}

export const Sidemenu: FC<SidemenuProps> = ({ onSelect }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggleTheme } = useContext(themeCtx)
  const { locale, toggleLocale } = useContext(localeCtx)

  const selectedKey = location.pathname.slice(1).split('/')[0]

  const navItems: ItemType<MenuItemType>[] = useMemo(
    () => [
      {
        key: SIDEMENU_ITEMS.DISK,
        label: capitalize(t('disk')),
        icon: <DatabaseOutlined />,
        onClick: () => navigate('/disk'),
      },
      {
        key: SIDEMENU_ITEMS.TRASH,
        label: capitalize(t('trash')),
        icon: <DeleteOutlined />,
        onClick: () => navigate('/trash'),
      },
      { type: SIDEMENU_ITEMS.DIVIDER },
      {
        key: SIDEMENU_ITEMS.THEME,
        label: capitalize(t(`theme.${[THEMES.LIGHT, THEMES.DARK][+isDark]}`)),
        icon: !isDark ? <SunOutlined /> : <MoonOutlined />,
        onClick: toggleTheme,
      },
      {
        key: SIDEMENU_ITEMS.TRANSLATE,
        label: locale.toUpperCase(),
        icon: <TranslationOutlined />,
        onClick: toggleLocale,
      },
    ],
    [isDark, locale]
  )

  return (
    <Menu
      mode="inline"
      css={menuCss}
      selectable={false}
      selectedKeys={[selectedKey]}
      items={navItems}
      onClick={onSelect}
    />
  )
}
