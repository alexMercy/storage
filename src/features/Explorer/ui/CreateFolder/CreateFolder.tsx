import { useCreateResource } from '@/api/resources'
import { FolderEditor } from '@/features/Explorer/ui/FolderEditor/FolderEditor'
import { FolderFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button } from 'antd'
import { t } from 'i18next'
import { useState, type FC } from 'react'

interface CreateFolderProps {
  collapsed?: boolean
}

export const CreateFolder: FC<CreateFolderProps> = ({ collapsed = false }) => {
  const [isOpen, setOpen] = useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)

  const { mutateAsync: createFolder } = useCreateResource()

  return (
    <>
      <Button
        block
        type="primary"
        css={css({ marginBottom: 12 })}
        onClick={open}
        icon={<FolderFilled />}
      >
        <span
          css={css({
            transition: 'width .2s ease, margin .2s ease',
            width: !collapsed ? 120 : 0,
            marginLeft: !collapsed ? 0 : -5,
            overflow: 'hidden',
          })}
        >
          {t('createFolder')}
        </span>
      </Button>
      <FolderEditor open={isOpen} onCancel={close} request={createFolder} />
    </>
  )
}
