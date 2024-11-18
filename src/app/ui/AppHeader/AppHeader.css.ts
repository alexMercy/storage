import { css } from '@emotion/react'

const root = (isDark: boolean) => ({
  root: css`
    border-bottom: 1px solid
      rgba(${!isDark ? '5, 5, 5, 0.06' : '253, 253, 253, 0.12'});
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: 24px;
  `,

  logoWrapper: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  logo: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    filter: brightness(${isDark ? 70 : 100}%);
    transition: filter 0.5s;
  `,

  logoTitle: css`
    margin: 0;
  `,
})

export default root
