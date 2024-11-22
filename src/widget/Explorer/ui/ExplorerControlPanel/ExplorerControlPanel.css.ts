import { css } from '@emotion/react'

const root = {
  panelContainer: css`
    margin-top: 12px;
    height: 40px;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  `,
  panelContainerLeft: css`
    display: flex;
    gap: 12px;
    align-items: center;
  `,
  upButton: (isCollapsed: boolean) => css`
    width: 100px;
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
}
export default root
