import { useUpdateFolder } from '@/api/resources'
import { Resource, RESOURCE_TYPES } from '@/db/resource'
import { FolderEditor } from '@/features/Explorer/ui/FolderEditor/FolderEditor'
import { useManageExplorerEvents } from '@/widget/Explorer'
import { EditOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Tooltip } from 'antd'
import { t } from 'i18next'
import { useState, type FC } from 'react'

interface RenameResourceProps {}

const getTitle = ({ type, title }: Resource) => {
  const isFolder = type === RESOURCE_TYPES.FOLDER

  if (isFolder) return title

  const extension = title.split('.').pop()
  if (!extension) throw new Error('Wrong file extension')
  return title.slice(0, -(extension.length + 1))
}

export const RenameResource: FC<RenameResourceProps> = () => {
  const { selectedResources } = useManageExplorerEvents()
  const [open, setOpen] = useState(false)
  const resourceUuid = selectedResources[0]
  const { mutateAsync: updateFolder } = useUpdateFolder()
  const close = () => setOpen(false)
  return (
    <>
      <Tooltip title={t('rename')}>
        <Button
          variant="filled"
          color="default"
          css={css({ width: '50px !important' })}
          icon={<EditOutlined />}
          onClick={() => setOpen(true)}
          disabled={selectedResources.length > 1}
        />
      </Tooltip>
      <FolderEditor
        open={open}
        onCancel={close}
        request={updateFolder}
        resourceUuid={resourceUuid}
      />
    </>
  )
}
