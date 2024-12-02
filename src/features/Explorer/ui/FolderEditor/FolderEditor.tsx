import { useResource } from '@/api/resources'
import { FolderBody } from '@/db/folderApi'
import {
  createFormMap,
  EditorFolderValues,
} from '@/features/Explorer/lib/forms'
import { FormMapper } from '@/shared/ui/FormMapper/FormMapper'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { Form, message, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

interface FolderEditorProps<T> {
  open: boolean
  resourceUuid?: string
  onCancel: () => void
  request: T
}

//UseMutateAsyncFunction<Folder, Error, FolderBody, unknown>

/* UseMutateAsyncFunction<Folder, Error, {
    uuid: string;
    body: FolderBody;
}, unknown>
*/

export const FolderEditor = <
  T extends UseMutateAsyncFunction<any, Error, any, unknown>
>({
  open,
  resourceUuid,
  request,
  onCancel,
}: FolderEditorProps<T>) => {
  const { t } = useTranslation()
  const [messageApi, messageContextHolder] = message.useMessage()
  const [modal, modalContextHolder] = Modal.useModal()
  const [form] = Form.useForm<EditorFolderValues>()
  const { data: resource } = useResource(resourceUuid ?? '')

  const { uuid } = useParams()

  const close = () => {
    form.resetFields()
    onCancel()
  }

  const cancel = () => {
    if (form.isFieldsTouched()) {
      modal.confirm({
        title: 'Are you sure?',
        onOk: close,
      })
    } else {
      close()
    }
  }

  const onSubmit = async ({ title }: EditorFolderValues) => {
    const parent = resource?.parent ?? uuid ?? 'root'
    const body: FolderBody = {
      title,
      parent,
    }

    const variables = resource ? { uuid: resource.uuid, body } : body

    await request(variables)
    messageApi.success(`Success created folder ${title}!`)
    close()
  }

  const onOk = () => {
    form.submit()
  }

  return (
    <>
      {messageContextHolder}
      {modalContextHolder}
      <Modal
        title={t('createFolder')}
        destroyOnClose
        open={open}
        onOk={onOk}
        onCancel={cancel}
        okButtonProps={{ htmlType: 'submit' }}
        closable={false}
      >
        <FormMapper form={form} fields={createFormMap} onSumbit={onSubmit} />
      </Modal>
    </>
  )
}
