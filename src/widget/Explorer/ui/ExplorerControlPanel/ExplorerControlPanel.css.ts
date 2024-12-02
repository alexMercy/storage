import { css } from '@emotion/react'
import { GlobalToken } from 'antd'

const root = {
  breadcrumbRow: css({ display: 'flex', justifyContent: 'space-between' }),
  panelContainer: css`
    margin-top: 12px;
    height: 40px;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  `,
  panelContainerLeft: css`
    margin-top: 12px;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
  `,
  upButton: (isCollapsed: boolean) => css`
    ${isCollapsed &&
    `
      width: 0;
      padding: 0;
      border: 0 solid transparent; 
    `}

    overflow: hidden;
    transition: ${['color', 'background-color', 'width', 'padding', 'border']
      .map((prop) => `${prop} 0.2s ease-in-out`)
      .join(', ')};
  `,
  selection: {
    container: (resourceCount: number) => css`
      display: flex;
      gap: 12px;
      align-items: center;
      opacity: ${+!!resourceCount};
      transition: opacity 0.2s ease;
    `,
    tag: (resourceCount: number, token: GlobalToken) => css`
      opacity: ${+!!resourceCount};
      transition: opacity 0.2s ease;
      font-size: 14px;
      font-weight: 700;
      padding: 6px 15px;
      margin: 0;
      border-radius: ${token.borderRadius};
      display: flex;
      align-items: center;
      gap: 4px;
    `,
    clearSelection: (baseToken: GlobalToken) =>
      css({
        fontSize: '14px !important',
        color: `${baseToken.colorWarningActive} !important`,
        ':hover': {
          color: `${baseToken.colorWarning} !important`,
        },
      }),
  },
}
export default root
