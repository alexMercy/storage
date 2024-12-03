import { Sidemenu } from '@/app/ui/Sidemenu/Sidemenu'
import { CreateFolder } from '@/features/Explorer/ui/CreateFolder/CreateFolder'
import { RightOutlined, UploadOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Grid, Tag, theme } from 'antd'
import AntdSider from 'antd/es/layout/Sider'
import { capitalize } from 'lodash'
import { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import scs from './Sider.css'

const { useToken } = theme

export const Sider: FC = () => {
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
        <div>
          <CreateFolder collapsed={collapsed} />
          <Button
            block
            type="dashed"
            css={css({
              marginBottom: 12,
              height: collapsed ? 60 : 32,
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
              <Tag
                bordered={false}
                css={[
                  css({
                    padding: '0px 10px',
                    margin: 0,
                    borderRadius: 32,
                    color: token.colorTextPlaceholder,
                  }),
                  css({
                    transition: 'width .2s ease, margin .2s ease',
                    border: 'none',
                    overflow: 'hidden',
                  }),
                ]}
              >
                Drop
              </Tag>
            </div>
          </Button>
          <Sidemenu />
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
