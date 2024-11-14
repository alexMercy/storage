import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { Logo } from '@/assets'
import {
  DatabaseOutlined,
  DeleteOutlined,
  MoonOutlined,
  RightOutlined,
  SunOutlined,
} from '@ant-design/icons'
import { Button, Calendar, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { capitalize } from 'lodash'
import { useContext, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'

const { useToken } = theme

export const AppLayout: FC = () => {
  const { token } = useToken()
  const { t } = useTranslation()
  const { toggleTheme, themePreset } = useContext(themeCtx)
  const { locale, toggleLocale } = useContext(localeCtx)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout
      style={{
        background: token.Layout?.headerBg,
      }}
    >
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
          <Logo
            height={50}
            style={{
              filter: `brightness(${themePreset === 'dark' ? 70 : 100}%)`,
              transition: 'filter .5s',
            }}
          />
          <h3 style={{ margin: 0 }}>STORAGE</h3>
          <Button
            icon={themePreset === 'light' ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
          />
          <Button onClick={toggleLocale}>{locale}</Button>
        </div>
      </Header>
      <Content
        style={{
          background: token.Layout?.headerBg,
        }}
      >
        <Layout
          style={{
            minHeight: `calc(100dvh - ${token.Layout?.headerHeight}px)`,
            background: token.Layout?.headerBg,
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
              items={[
                {
                  key: 'disk',
                  label: capitalize(t('disk')),
                  icon: <DatabaseOutlined />,
                },
                {
                  key: 'trash',
                  label: capitalize(t('trash')),
                  icon: <DeleteOutlined />,
                },
              ]}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 24,
              }}
            >
              <Button
                style={{
                  width: !collapsed ? 300 : 150,
                }}
                color="primary"
                variant={'filled'}
                icon={<RightOutlined rotate={!collapsed ? 180 : 0} />}
                onClick={() => setCollapsed((prev) => !prev)}
              >
                {/* TODO: add antd animation */}
                {!collapsed && 'Collapse'}
              </Button>
            </div>
          </Sider>
          <div style={{ width: 350 }}></div>
          <Content
            style={{
              padding: '24px',
              minHeight: 280,
              backgroundColor: token.Layout?.headerBg,
            }}
          >
            <Calendar fullscreen={false} />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
