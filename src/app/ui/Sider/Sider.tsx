import { localeCtx, themeCtx } from '@/app/lib/core-context'
import { THEMES } from '@/app/lib/core-enums'
import { Sidemenu } from '@/app/ui/Sidemenu/Sidemenu'
import { CreateFolder } from '@/features/Explorer/ui/CreateFolder/CreateFolder'
import { CollapsedTile, HotKeyTag } from '@/shared'
import {
  MoonOutlined,
  RightOutlined,
  SunOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Grid, theme } from 'antd'
import AntdSider from 'antd/es/layout/Sider'
import { capitalize } from 'lodash'
import { useContext, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import scs from './Sider.css'

const { useToken } = theme

export const Sider: FC = () => {
  const { isDark, toggleTheme } = useContext(themeCtx)
  const { locale, toggleLocale } = useContext(localeCtx)
  const { token } = useToken()
  const { t } = useTranslation()
  const screens = Grid.useBreakpoint()
  const [collapsed, setCollapsed] = useState(!screens.lg)
  const sidemenuWidth = [350, 150]

  const styles = scs({ token, collapsed, screens, sidemenuWidth })
  return (
    <>
      <AntdSider
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(e) => setCollapsed(e)}
        width={sidemenuWidth[0]}
        collapsedWidth={sidemenuWidth[1]}
        css={styles.sider}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 12px;
          `}
        >
          <CreateFolder collapsed={collapsed} />
          <Button
            block
            type="dashed"
            css={css({
              height: collapsed ? 60 : 40,
            })}
          >
            <div
              css={css({
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              })}
            >
              <div
                css={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: collapsed ? -7 : 0,
                  transition: 'margin .2s ease',
                })}
              >
                <UploadOutlined />
                <span
                  css={css({
                    transition: 'width .3s ease, margin .2s ease',
                    width: !collapsed ? 120 : 0,
                    marginLeft: !collapsed ? 0 : -5,
                    overflow: 'hidden',
                  })}
                >
                  {t('upload')}
                </span>
              </div>
              <HotKeyTag text="Drop" />
            </div>
          </Button>
          <Sidemenu />
          <div css={styles.sidemenuWrapper}>
            <CollapsedTile
              collapsed={collapsed}
              icon={!isDark ? <SunOutlined /> : <MoonOutlined />}
              hotKeyText="Ctrl+O"
              text={capitalize(
                t(`theme.${[THEMES.LIGHT, THEMES.DARK][+isDark]}`)
              )}
              antButtonProps={{ type: 'default' }}
              onClick={toggleTheme}
            />
            <CollapsedTile
              collapsed={collapsed}
              icon={locale.toUpperCase()}
              hotKeyText="Ctrl+L"
              antButtonProps={{
                type: 'default',
              }}
              onClick={toggleLocale}
            />
          </div>
        </div>

        <div css={styles.collapseWrapper}>
          <Button
            css={styles.collapse}
            color="primary"
            variant="outlined"
            icon={<RightOutlined rotate={!collapsed ? 180 : 0} />}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {/* TODO: add antd animation */}
            {!collapsed && capitalize(t('collapse'))}
          </Button>
        </div>
      </AntdSider>

      <div css={styles.placeholder}></div>
    </>
  )
}
