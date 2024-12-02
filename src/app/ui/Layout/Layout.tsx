import { AppHeader } from '@/app/ui/AppHeader/AppHeader'
import { Sider } from '@/app/ui/Sider/Sider'
import { Card, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import scs from './Layout.css.ts'
const { useToken } = theme

export const AppLayout: FC = () => {
  const { token } = useToken()
  const styles = scs(token)

  return (
    <Layout css={styles.mainBackground}>
      <AppHeader />
      <Content css={styles.mainBackground}>
        <Layout css={[styles.mainMinHeight(), styles.mainBackground]}>
          <Sider />
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
