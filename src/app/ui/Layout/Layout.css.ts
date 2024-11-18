import { css } from '@emotion/react'
import { GlobalToken } from 'antd'

const root = (token: GlobalToken) => ({
  mainBackground: css`
    background: ${token.Layout?.headerBg};
  `,
  mainMinHeight: (more = '') => css`
    min-height: calc(100dvh - ${token.Layout?.headerHeight}px ${more});
  `,
  mainPadding: css`
    padding: 25px;
    padding-right: 50px;
  `,
})

export default root
