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
  tag: css({
    padding: '0px 10px',
    margin: 0,
    borderRadius: 32,
    color: token.colorTextPlaceholder,
  }),
})
export default searchExplorerStyles
