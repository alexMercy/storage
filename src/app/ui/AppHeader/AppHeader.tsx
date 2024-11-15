import { themeCtx } from '@/app/lib/core-context'
import { Logo } from '@/assets'
import { css } from '@emotion/react'
import { Button, Grid } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Dispatch, SetStateAction, useContext, type FC } from 'react'

interface AppHeaderProps {
  setMenu: Dispatch<SetStateAction<boolean>>
}

export const AppHeader: FC<AppHeaderProps> = ({ setMenu }) => {
  const { isDark } = useContext(themeCtx)
  const screens = Grid.useBreakpoint()
  const openMenu = () => {
    setMenu(true)
  }

  return (
    <Header
      css={css`
        border-bottom: 1px solid
          rgba(${!isDark ? '5, 5, 5, 0.06' : '253, 253, 253, 0.12'});
        position: sticky;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 24px;
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
      {!screens.md && <Button onClick={openMenu}>Menu</Button>}
    </Header>
  )
}
