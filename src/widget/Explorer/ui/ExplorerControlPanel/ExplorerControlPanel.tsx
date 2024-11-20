import { FolderResources } from '@/api/resource'
import {
  ExplorerViews,
  useManageExplorerEvents,
} from '@/widget/Explorer/lib/useManageExplorerEvents'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Breadcrumb, Button, Segmented } from 'antd'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ExplorerControlPanelProps {
  folder: FolderResources | undefined
}

export const ExplorerControlPanel: FC<ExplorerControlPanelProps> = ({
  folder,
}) => {
  const navigate = useNavigate()
  const { selectViewType, viewType } = useManageExplorerEvents()
  const onUpClick = ({ parentPath }: FolderResources) => {
    const isParentRoot = parentPath.length === 2
    if (isParentRoot) {
      navigate('/disk')
    } else {
      const parentUuid = parentPath[parentPath.length - 2].uuid
      navigate(`/disk/${parentUuid}`)
    }
  }

  return (
    <div>
      <Breadcrumb items={folder?.parentPath} />
      <div
        css={css`
          margin-top: 12px;
          height: 40px;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
        `}
      >
        {folder?.parentPath.length && folder?.parentPath.length > 1 ? (
          <Button onClick={() => onUpClick(folder)}>Up</Button>
        ) : (
          <div></div>
        )}
        <Segmented
          onChange={(e) => selectViewType(e)}
          value={viewType}
          options={[
            {
              value: ExplorerViews.TABLE,
              icon: <BarsOutlined />,
              title: 'Table',
            },
            {
              value: ExplorerViews.CARDS,
              icon: <AppstoreOutlined />,
              title: 'Cards',
            },
          ]}
        />
      </div>
    </div>
  )
}
