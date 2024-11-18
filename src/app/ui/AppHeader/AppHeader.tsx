import { themeCtx } from '@/app/lib/core-context'
import { Logo } from '@/assets'
import { MenuOutlined } from '@ant-design/icons'
import { Button, Grid } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Dispatch, SetStateAction, useContext, type FC } from 'react'
import sts from './AppHeader.css'

interface AppHeaderProps {
  setMenu: Dispatch<SetStateAction<boolean>>
}

export const AppHeader: FC<AppHeaderProps> = ({ setMenu }) => {
  const { isDark } = useContext(themeCtx)
  const screens = Grid.useBreakpoint()
  const openMenu = () => {
    setMenu(true)
  }

  const styles = sts(isDark)
  return (
    <Header css={styles.logo}>
      <div css={styles.logoWrapper}>
        <Logo height={50} css={styles.logo} />
        <h3 css={styles.logoTitle}>STORAGE</h3>
      </div>
      {!screens.md && (
        <Button
          onClick={openMenu}
          icon={<MenuOutlined />}
          iconPosition="end"
          variant="filled"
          color="default"
        >
          Menu
        </Button>
      )}
    </Header>
  )
}
