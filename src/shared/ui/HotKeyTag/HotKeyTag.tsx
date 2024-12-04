import { css } from '@emotion/react'
import { GlobalToken, Tag, theme } from 'antd'
import type { FC } from 'react'

interface HotKeyTagProps {
  text: string
}

const rootCss = (token: GlobalToken) =>
  css({
    padding: '0px 10px',
    margin: 0,
    borderRadius: 32,
    color: token.colorTextPlaceholder,
  })

export const HotKeyTag: FC<HotKeyTagProps> = ({ text }) => {
  const { token } = theme.useToken()
  return (
    <Tag bordered={false} css={rootCss(token)}>
      {text}
    </Tag>
  )
}
