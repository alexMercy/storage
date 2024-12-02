import {
  useCreateResource,
  useDeleteResources,
  useUpdateFolder,
} from '@/api/resources'
import { themeCtx } from '@/app/lib/core-context'
import { Logo } from '@/assets'
import { FolderBody } from '@/db/folderApi'
import { SearchExplorer } from '@/features/Explorer'
import { css } from '@emotion/react'
import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useContext, type FC } from 'react'
import sts from './AppHeader.css'

interface AppHeaderProps {}

const mockUpdateFolder: { uuid: string; body: FolderBody } = {
  uuid: '652d1f61-61c5-4831-b712-5ac8cf3fd710',
  body: {
    parent: 'd83492a7-5d23-4af9-a136-9560c4c8c61e',
    title: 'Иннер Папочка',
  },
}

const mockCreateFolder: FolderBody = {
  parent: 'd83492a7-5d23-4af9-a136-9560c4c8c61e',
  title: 'Новая Папочка',
}

const mockDeleteFileUuid = '652d1f61-61c5-4831-b712-5ac8cf3fd710'

export const AppHeader: FC<AppHeaderProps> = () => {
  const { isDark } = useContext(themeCtx)
  const styles = sts(isDark)
  const { mutateAsync: updateFolder } = useUpdateFolder()
  const { mutateAsync: deleteResources } = useDeleteResources()
  const { mutateAsync: createResource } = useCreateResource()
  return (
    <Header css={styles.root}>
      <div css={[styles.logoWrapper]}>
        <Logo height={50} css={[styles.logo]} />
        <h3 css={styles.logoTitle}>STORAGE</h3>
      </div>
      <div
        css={css`
          padding-top: 4px;
        `}
      >
        <SearchExplorer />
      </div>
      <Button onClick={() => createResource(mockCreateFolder)}>
        Create folder
      </Button>
      <Button onClick={() => updateFolder(mockUpdateFolder)}>
        Update folder
      </Button>
      <Button onClick={() => deleteResources([mockDeleteFileUuid])}>
        Delete file
      </Button>
    </Header>
  )
}
