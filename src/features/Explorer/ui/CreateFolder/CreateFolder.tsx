import { useCreateResource } from '@/api/resources'
import { useIsCreateModalVisible } from '@/features/Explorer'
import { FolderEditor } from '@/features/Explorer/ui/FolderEditor/FolderEditor'
import { HotKeyTag } from '@/shared'
import { FolderFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button } from 'antd'
import { t } from 'i18next'
import { type FC } from 'react'

interface CreateFolderProps {
  collapsed?: boolean
}

export const CreateFolder: FC<CreateFolderProps> = ({ collapsed = false }) => {
  const { isCreateOpen, setIsCreateOpen } = useIsCreateModalVisible()
  const open = () => setIsCreateOpen(true)
  const close = () => setIsCreateOpen(false)

  const { mutateAsync: createFolder } = useCreateResource()

  return (
    <>
      <Button
        block
        type="primary"
        css={css({
          height: collapsed ? 60 : 32,
        })}
        onClick={open}
      >
        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          })}
        >
          <div
            css={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: collapsed ? -7 : 0,
              transition: 'margin .2s ease',
            })}
          >
            <FolderFilled />
            <span
              css={css({
                transition: 'width .3s ease, margin .2s ease',
                width: !collapsed ? 120 : 0,
                marginLeft: !collapsed ? 0 : -5,
                overflow: 'hidden',
              })}
            >
              {t('createFolder')}
            </span>
          </div>
          <HotKeyTag text="Ctrl+P" />
        </div>
      </Button>
      <FolderEditor
        title={t('createFolder')}
        open={isCreateOpen}
        onCancel={close}
        request={createFolder}
      />
    </>
  )
}
