import { useUpdateResource } from '@/api/resources'
import { FolderEditor } from '@/features/Explorer/ui/FolderEditor/FolderEditor'
import { useManageExplorerEvents } from '@/widget/Explorer'
import { EditOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Tooltip } from 'antd'
import { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'

interface RenameResourceProps {}

export const RenameResource: FC<RenameResourceProps> = () => {
  const { selectedResources } = useManageExplorerEvents()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const resourceUuid = selectedResources[0]
  const { mutateAsync: updateFolder } = useUpdateResource()
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
        title={t('renameFolder')}
        open={open}
        onCancel={close}
        request={updateFolder}
        resourceUuid={resourceUuid}
      />
    </>
  )
}
