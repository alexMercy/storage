import { themeCtx } from '@/app/lib/core-context'
import { Logo } from '@/assets'
import { SearchExplorer } from '@/features/Explorer'
import { css } from '@emotion/react'
import { Header } from 'antd/es/layout/layout'
import { useContext, type FC } from 'react'
import sts from './AppHeader.css'

interface AppHeaderProps {}

export const AppHeader: FC<AppHeaderProps> = () => {
  const { isDark } = useContext(themeCtx)
  const styles = sts(isDark)
  return (
    <Header css={styles.root}>
      <div css={[styles.logoWrapper]}>
        <Logo height={50} css={[styles.logo]} />
        <h3 css={styles.logoTitle}>STORAGE</h3>
      </div>
      <div
        css={css`
          padding-top: 4px;
        `}
      >
        <SearchExplorer />
      </div>
    </Header>
  )
}
