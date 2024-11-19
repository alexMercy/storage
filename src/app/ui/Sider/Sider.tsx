import { Sidemenu } from '@/app/ui/Sidemenu/Sidemenu'
import { RightOutlined } from '@ant-design/icons'
import { Button, Grid, theme } from 'antd'
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
  const [collapsed, setCollapsed] = useState(!(screens.lg ?? true))
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
        <Sidemenu />

        <div css={styles.collapseWrapper}>
          <Button
            css={styles.collapse}
            color="primary"
            variant={'filled'}
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
