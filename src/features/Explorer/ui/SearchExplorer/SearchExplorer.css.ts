import { css } from '@emotion/react'
import { GlobalToken } from 'antd'

const searchExplorerStyles = (token: GlobalToken) => ({
  triggerButton: css`
    justify-content: space-between;
    width: 200px;
    padding-right: 4px !important;
    color: ${token.colorTextPlaceholder};
  `,
  searchInnerWrapper: css`
    display: flex;
    align-content: center;
    gap: 4px;
  `,
})
export default searchExplorerStyles
