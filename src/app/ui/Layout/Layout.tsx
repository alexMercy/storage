import { AppHeader } from '@/app/ui/AppHeader/AppHeader'
import { Sidemenu } from '@/app/ui/Sidemenu/Sidemenu'
import { css } from '@emotion/react'
import { Card, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const { useToken } = theme

export const AppLayout: FC = () => {
  const { token } = useToken()

  return (
    <Layout
      css={css`
        background: ${token.Layout?.headerBg};
      `}
    >
      <AppHeader />
      <Content
        css={css`
          background: ${token.Layout?.headerBg};
        `}
      >
        <Layout
          css={css`
            min-height: calc(100dvh - ${token.Layout?.headerHeight}px);
            background: ${token.Layout?.headerBg};
          `}
        >
          <Sidemenu />
          <Content
            css={css`
              padding: 25px;
              padding-right: 50px;
              min-height: calc(100dvh - ${token.Layout?.headerHeight}px);
            `}
          >
            <Card
              css={css`
                min-height: 500px;
              `}
            >
              <Outlet />
            </Card>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
