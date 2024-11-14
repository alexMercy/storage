import { RadarChartOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { useState, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Logo } from '../../../assets'

const { useToken } = theme
export const AppLayout: FC = () => {
  const { token } = useToken()

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Header
        style={{
          borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo height={50} />
          <h3 style={{ margin: 0 }}>STORAGE</h3>
        </div>
      </Header>
      <Content>
        <Layout
          style={{
            minHeight: `calc(100dvh - ${token.Layout?.headerHeight}px)`,
          }}
        >
          <Sider
            collapsed={collapsed}
            width={350}
            collapsedWidth={150}
            style={{
              position: 'fixed',
              padding: '24px',
              minHeight: `calc(100dvh - ${token.Layout?.headerHeight}px)`,
            }}
          >
            <Menu
              mode="inline"
              style={{
                borderRadius: '16px',
                height: '500px',
              }}
              items={[{ key: '1', label: '1', icon: <RadarChartOutlined /> }]}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={{
                  position: 'absolute',
                  width: !collapsed ? 150 : 50,
                  bottom: 50,
                }}
                onClick={() => setCollapsed((prev) => !prev)}
              >
                Collapse
              </Button>
            </div>
          </Sider>
          <div style={{ width: 350 }}></div>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
