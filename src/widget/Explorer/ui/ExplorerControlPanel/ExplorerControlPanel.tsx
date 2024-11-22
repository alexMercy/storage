import { FolderResources } from '@/api/resource'
import {
  ExplorerViews,
  useManageExplorerEvents,
} from '@/widget/Explorer/lib/useManageExplorerEvents'
import {
  AppstoreOutlined,
  ArrowUpOutlined,
  BarsOutlined,
  DeleteFilled,
  DownloadOutlined,
  FolderFilled,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import {
  Breadcrumb,
  Button,
  Divider,
  Grid,
  Segmented,
  Skeleton,
  Tag,
  theme,
} from 'antd'
import { capitalize } from 'lodash'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import sts from './ExplorerControlPanel.css'
interface ExplorerControlPanelProps {
  folder: FolderResources | undefined
}

export const ExplorerControlPanel: FC<ExplorerControlPanelProps> = ({
  folder,
}) => {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const screens = Grid.useBreakpoint()
  const { t } = useTranslation()
  const {
    selectedResources,
    viewType,
    selectViewType,
    clearSelectionResource,
  } = useManageExplorerEvents()

  const styles = sts

  const onUpClick = ({ parentPath }: FolderResources) => {
    const isParentRoot = parentPath.length === 2
    if (isParentRoot) {
      navigate('/disk')
    } else {
      const parentUuid = parentPath[parentPath.length - 2].uuid
      navigate(`/disk/${parentUuid}`)
    }
    clearSelectionResource()
  }

  return (
    <div>
      {!folder?.parentPath ? (
        <Skeleton.Input active style={{ height: 20 }} />
      ) : (
        <div style={{ display: 'flex' }}>
          <Breadcrumb items={folder?.parentPath} />
        </div>
      )}
      <div css={styles.panelContainer}>
        <div css={styles.panelContainerLeft}>
          <Button
            css={styles.upButton(!((folder?.parentPath?.length || 0) > 1))}
            icon={<ArrowUpOutlined />}
            type="primary"
            onClick={() => onUpClick(folder!)}
          >
            {capitalize(t('up'))}
          </Button>

          <Button icon={<FolderFilled />}>
            {screens.xl && 'Create folder'}
          </Button>
          <div
            css={[
              styles.panelContainerLeft,
              css`
                opacity: ${+!!selectedResources.length};
                transition: opacity 0.2s ease;
              `,
            ]}
          >
            <Divider
              type="vertical"
              style={{
                height: '1rem',
              }}
            />
            <Button icon={<DownloadOutlined />}>
              {screens.xl && 'Download'}
            </Button>
            <Button icon={<DeleteFilled />} danger>
              {screens.xl && 'Delete'}
            </Button>
          </div>
        </div>

        <div css={styles.panelContainerLeft}>
          <Tag
            css={css`
              opacity: ${+!!selectedResources.length};
              transition: opacity 0.2s ease;
              font-size: 14px;
              font-weight: 700;
              padding: 6px 15px;
              margin: 0;
              border-radius: ${token.borderRadius};
            `}
            color="gold"
          >
            {t('selectedRecords.plural', {
              postProcess: 'interval',
              count: selectedResources.length,
            })}
          </Tag>
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
    </div>
  )
}
