import { themeCtx } from '@/app/lib/core-context'
import { Logo } from '@/assets'
import { css } from '@emotion/react'
import { Header } from 'antd/es/layout/layout'
import { useContext, type FC } from 'react'

export const AppHeader: FC = () => {
  const { isDark } = useContext(themeCtx)

  return (
    <Header
      css={css`
        border-bottom: 1px solid
          rgba(${!isDark ? '5, 5, 5, 0.06' : '253, 253, 253, 0.12'});
        position: sticky;
        top: 0;
        left: 0;
        z-index: 999;
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
            filter: brightness(${isDark ? 70 : 100}%);
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
      </div>
    </Header>
  )
}
