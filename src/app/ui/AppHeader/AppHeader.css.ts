import { css } from '@emotion/react'

const root = (isDark: boolean) => ({
  root: css`
    display: flex;
    align-items: center;
    gap: 16px;
  `,

  logoWrapper: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 2px;
  `,

  logo: css`
    justify-content: space-between;

    filter: brightness(${isDark ? 70 : 100}%);
    transition: filter 0.5s;
  `,

  logoTitle: css`
    margin: 0;
  `,
})

export default root
