import { useDeleteResources } from '@/api/resources'
import { useKeyboardShortcut } from '@/app/lib/keyboardShortcutsContext'
import { useManageExplorerEvents } from '@/widget/Explorer'
import { DeleteFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, message, Tooltip } from 'antd'
import { t } from 'i18next'
import { useEffect, type FC } from 'react'

interface DeleteResourcesProps {}
export const DeleteResources: FC<DeleteResourcesProps> = () => {
  const { addShortcut, removeShortcut } = useKeyboardShortcut()
  const [messageApi, contextHolder] = message.useMessage()
  const { selectedResources, selectResources } = useManageExplorerEvents()
  const { mutateAsync: deleteResources } = useDeleteResources()

  const deleteSelected = async () => {
    if (!selectedResources.length) return
    await deleteResources(selectedResources)
    messageApi.success('Moved to trash')
    selectResources([])
  }

  useEffect(() => {
    addShortcut('Delete', deleteSelected)
    return () => removeShortcut('Delete')
  })

  return (
    <>
      {contextHolder}
      <Tooltip title={t('delete')}>
        <Button
          variant="filled"
          color="danger"
          css={css({ width: '50px !important' })}
          icon={<DeleteFilled />}
          onClick={deleteSelected}
        />
      </Tooltip>
    </>
  )
}
