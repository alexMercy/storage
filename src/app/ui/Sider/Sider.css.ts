import { css } from '@emotion/react'
import { GlobalToken, Grid } from 'antd'

interface RootProps {
  token: GlobalToken
  collapsed: boolean
  screens: ReturnType<(typeof Grid)['useBreakpoint']>
  sidemenuWidth: number[]
}

const root = ({ token, collapsed, screens, sidemenuWidth }: RootProps) => ({
  sider: css`
    position: fixed;
    padding: 25px;
    padding-left: 50px;
    min-height: calc(100dvh - ${token.Layout?.headerHeight}px);
  `,
  collapseWrapper: css`
    display: flex;
    justify-content: center;
    margin-top: 24px;
  `,
  collapse: css`
    width: ${!collapsed ? '300px' : '150px'} !important;
  `,
  placeholder: css`
    transition: width 0.2s;
    width: ${!screens.md ? 0 : sidemenuWidth[+collapsed]}px;
  `,
})

export default root
