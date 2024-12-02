import { useDeleteResources } from '@/api/resources'
import { useManageExplorerEvents } from '@/widget/Explorer'
import { DeleteFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, message, Tooltip } from 'antd'
import { t } from 'i18next'
import type { FC } from 'react'

interface DeleteResourcesProps {}
export const DeleteResources: FC<DeleteResourcesProps> = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { selectedResources, selectResources } = useManageExplorerEvents()
  const { mutateAsync: deleteResources } = useDeleteResources()

  const deleteSelected = async () => {
    await deleteResources(selectedResources)
    messageApi.success('Moved to trash')
    selectResources([])
  }
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
