import { SIDEMENU_ITEMS } from '@/app/lib/core-enums'
import { DatabaseOutlined, DeleteOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { capitalize } from 'lodash'
import { MenuProps } from 'rc-menu'
import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

const menuCss = css`
  border-radius: 16px;
  border-inline-end: 0 !important;
`

interface SidemenuProps {
  onSelect?: MenuProps['onClick']
}

export const Sidemenu: FC<SidemenuProps> = ({ onSelect }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

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
    ],
    []
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
