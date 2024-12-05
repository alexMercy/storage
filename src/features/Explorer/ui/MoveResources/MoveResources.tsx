import { useFolder, useMoveResource } from '@/api/resources'
import { MoveResourceOutlined } from '@/assets'
import { RESOURCE_TYPES } from '@/db/resource'
import { useManageExplorerEvents } from '@/widget/Explorer'
import { LoadingOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Modal, Tooltip } from 'antd'
import { t } from 'i18next'
import { useState, type FC } from 'react'

interface MoveResourcesProps {}

export const MoveResources: FC<MoveResourcesProps> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedResources, clearSelectionResource } =
    useManageExplorerEvents()
  const [selectedUuid, setSelectedUuid] = useState('root')
  const { data: folder } = useFolder(selectedUuid)
  const { mutateAsync: move } = useMoveResource()

  const onlyFolders = folder?.resources.filter(
    (v) =>
      v.type === RESOURCE_TYPES.FOLDER && !selectedResources.includes(v.uuid)
  )

  const onClose = () => {
    setIsOpen(false)
    setSelectedUuid('root')
    clearSelectionResource()
  }

  const onOk = async () => {
    await move({ uuids: selectedResources, parent: selectedUuid })
    onClose()
  }

  const onResourceClick = (uuid: string) => setSelectedUuid(uuid)

  const onMoveClick = () => {
    setIsOpen(true)
    console.log(selectedResources)
  }

  return (
    <>
      <Tooltip title={t('move')}>
        <Button
          variant="filled"
          color="default"
          css={css({ width: '50px !important' })}
          onClick={onMoveClick}
          icon={<MoveResourceOutlined />}
        />
      </Tooltip>
      <Modal
        open={isOpen}
        destroyOnClose
        title={`Переместить ${selectedResources.length} элемента(-ов)`}
        onCancel={onClose}
        onOk={onOk}
        width={800}
      >
        {!folder ? (
          <LoadingOutlined spin />
        ) : onlyFolders?.length ? (
          onlyFolders.map((resource) => (
            <Button
              key={resource.uuid}
              onDoubleClick={() => onResourceClick(resource.uuid)}
            >
              {resource.title}
            </Button>
          ))
        ) : (
          <>Нет подходящих вариантов</>
        )}
      </Modal>
    </>
  )
}
