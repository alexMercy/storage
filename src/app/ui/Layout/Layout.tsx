import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { Logo } from '@/assets'
import {
  DatabaseOutlined,
  DeleteOutlined,
  MoonOutlined,
  RightOutlined,
  SunOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
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
      css={css`
        background: ${token.Layout?.headerBg};
      `}
    >
      <Header
        css={css`
          border-bottom: 1px solid
            rgba(
              ${themePreset === 'light'
                ? '5, 5, 5, 0.06'
                : '253, 253, 253, 0.12'}
            );
          position: sticky;
          top: 0;
          left: 0;
          z-index: 2;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
          `}
        >
          <Logo
            height={50}
            css={css`
              filter: brightness(${themePreset === 'dark' ? 70 : 100}%);
              transition: filter 0.5s;
            `}
          />
          <h3
            css={css`
              margin: 0;
            `}
          >
            STORAGE
          </h3>
          <Button
            icon={themePreset === 'light' ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
          />
          <Button onClick={toggleLocale}>{locale}</Button>
        </div>
      </Header>
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
          <Sider
            collapsed={collapsed}
            width={350}
            collapsedWidth={150}
            css={css`
              position: fixed;
              padding: 24px;
              min-height: calc(100dvh - ${token.Layout?.headerHeight}px);
            `}
          >
            <Menu
              mode="inline"
              css={css`
                border-radius: 16px;
                min-height: 500px;
              `}
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
                {!collapsed && 'Collapse'}
              </Button>
            </div>
          </Sider>
          <div
            css={css`
              width: 350px;
            `}
          ></div>
          <Content
            css={css`
              padding: 24px;
              min-height: 280px;
              min-height: ${token.Layout?.headerBg};
            `}
          >
            <Calendar fullscreen={false} />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
