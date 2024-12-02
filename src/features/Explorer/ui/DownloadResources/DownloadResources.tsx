import { useDownloadResources } from '@/api/resources'
import { CodeBlock } from '@/shared'
import { useManageExplorerEvents } from '@/widget/Explorer'
import { DownloadOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Modal, Tooltip } from 'antd'
import { t } from 'i18next'
import { useState, type FC } from 'react'

interface DownloadResourcesProps {}

export const DownloadResources: FC<DownloadResourcesProps> = () => {
  const { mutateAsync: downloadResources } = useDownloadResources()

  const { selectedResources } = useManageExplorerEvents()

  const [resources, setResources] = useState<string | null>(null)

  const onDownloadClick = async () => {
    const resources = await downloadResources(selectedResources)
    setResources(JSON.stringify(resources, null, 2))
    console.log(resources)
  }

  const onClose = () => {
    setResources(null)
  }
  return (
    <>
      <Tooltip title={t('download')}>
        <Button
          variant="filled"
          color="default"
          css={css({ width: '50px !important' })}
          onClick={onDownloadClick}
          icon={<DownloadOutlined />}
        />
      </Tooltip>
      <Modal
        open={!!resources}
        title="Downloaded Data"
        onCancel={onClose}
        width={800}
        footer={null}
      >
        <CodeBlock code={resources ?? ''} lang="json" />
      </Modal>
    </>
  )
}
