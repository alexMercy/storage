import { SIDEMENU_ITEMS } from '@/app/lib/core-enums'
import { AppHeader } from '@/app/ui/AppHeader/AppHeader'
import { Sidemenu } from '@/app/ui/Sidemenu/Sidemenu'
import { Sider } from '@/app/ui/Sider/Sider'
import { css } from '@emotion/react'
import { Card, Drawer, Grid, Layout, MenuProps, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useState, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import scs from './Layout.css.ts'
const { useToken } = theme

export const AppLayout: FC = () => {
  const { token } = useToken()
  const screens = Grid.useBreakpoint()
  const [overlayMenuOpen, setOverlayMenuOpen] = useState(false)

  const styles = scs(token)

  const onOverlayMenuClose = () => {
    setOverlayMenuOpen(false)
  }

  const onOverlayMenuSelect: MenuProps['onClick'] = ({ key }) => {
    const personalizationItems = [
      SIDEMENU_ITEMS.THEME,
      SIDEMENU_ITEMS.TRANSLATE,
    ]

    if (!personalizationItems.includes(key as SIDEMENU_ITEMS)) {
      setOverlayMenuOpen(false)
    }
  }
  return (
    <Layout css={styles.mainBackground}>
      <AppHeader setMenu={setOverlayMenuOpen} />
      <Content css={styles.mainBackground}>
        <Layout css={[styles.mainMinHeight(), styles.mainBackground]}>
          {screens.md ? (
            <Sider />
          ) : (
            <Drawer
              css={css`
                background-color: ${token.colorBgContainer} !important;
              `}
              open={overlayMenuOpen}
              onClose={onOverlayMenuClose}
            >
              <Sidemenu onSelect={onOverlayMenuSelect} />
            </Drawer>
          )}
          <Content css={[styles.mainPadding, styles.mainMinHeight()]}>
            <Card bordered={false} css={styles.mainMinHeight('- 50px')}>
              <Outlet />
            </Card>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
