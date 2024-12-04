import { useKeyboardShortcut } from '@/app/lib/keyboardShortcutsContext'
import { FolderResources } from '@/db/resource'
import {
  DeleteResources,
  DownloadResources,
  RenameResource,
} from '@/features/Explorer'
import {
  ExplorerViews,
  useManageExplorerEvents,
} from '@/widget/Explorer/lib/useManageExplorerEvents'
import {
  AppstoreOutlined,
  ArrowUpOutlined,
  BarsOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import {
  Breadcrumb,
  Button,
  Divider,
  Segmented,
  Skeleton,
  Tag,
  theme,
} from 'antd'
import useToken from 'antd/es/theme/useToken'
import { capitalize } from 'lodash'
import { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import sts from './ExplorerControlPanel.css'
interface ExplorerControlPanelProps {
  folder: FolderResources | undefined
  isFetchedFolder: boolean
}

export const ExplorerControlPanel: FC<ExplorerControlPanelProps> = ({
  folder,
  isFetchedFolder,
}) => {
  const { addShortcut, removeShortcut } = useKeyboardShortcut()
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const baseToken = useToken()[1]
  const { t } = useTranslation()
  const {
    selectedResources,
    viewType,
    selectViewType,
    clearSelectionResource,
  } = useManageExplorerEvents()

  const styles = sts

  const [isUpButtonCollapsed, setIsUpButtonCollapsed] = useState<
    boolean | undefined
  >(undefined)

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

  //rewrite to effect for set correct initial state on parent node and keep previous data on new nodes
  useEffect(() => {
    if (!isFetchedFolder) setIsUpButtonCollapsed((prev) => prev ?? true)
    else setIsUpButtonCollapsed(!((folder?.parentPath?.length || 0) > 1))
  }, [isFetchedFolder, folder])

  useEffect(() => {
    const callback = () => {
      if (isUpButtonCollapsed) return
      onUpClick(folder!)
    }
    addShortcut('Backspace', callback)

    return () => removeShortcut('Backspace')
  }, [folder, isUpButtonCollapsed])

  return (
    <div>
      <div css={styles.breadcrumbRow}>
        {!folder?.parentPath ? (
          <Skeleton.Input active style={{ height: 20 }} />
        ) : (
          <Breadcrumb items={folder?.parentPath} />
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
      <div css={styles.panelContainerLeft}>
        <Button
          css={styles.upButton(isUpButtonCollapsed ?? false)}
          tabIndex={isUpButtonCollapsed ? -1 : undefined}
          icon={<ArrowUpOutlined />}
          type="primary"
          onClick={() => onUpClick(folder!)}
        >
          <span
            css={css`
              @media (max-width: 1024px) {
                display: none !important;
              }
            `}
          >
            {capitalize(t('up'))}
          </span>
        </Button>
        <div css={styles.selection.container(selectedResources.length)}>
          <DownloadResources />
          <RenameResource />
          <DeleteResources />
          <Divider
            type="vertical"
            style={{
              height: '1rem',
            }}
          />
          <Tag
            css={styles.selection.tag(selectedResources.length, token)}
            color="gold"
            onClose={() => clearSelectionResource()}
            closeIcon={
              <CloseOutlined css={styles.selection.clearSelection(baseToken)} />
            }
          >
            <span
              css={css`
                @media (max-width: 1024px) {
                  display: none;
                }
              `}
            >
              {t('selectedRecords.plural', {
                postProcess: 'interval',
                count: selectedResources.length || 1,
              })}
            </span>
            <span
              css={css`
                @media (min-width: 1025px) {
                  display: none;
                }
              `}
            >
              {selectedResources.length || 1}
            </span>
          </Tag>
        </div>
      </div>
    </div>
  )
}
