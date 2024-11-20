import { useResources } from '@/api/resources'
import { Explorer, ExplorerControlPanel } from '@/widget/Explorer'
import { css } from '@emotion/react'
import { Divider } from 'antd'
import { type FC } from 'react'
import { useParams } from 'react-router-dom'

export const DiskPage: FC = () => {
  const { uuid } = useParams()
  const { data: folder } = useResources(uuid || 'root')

  return (
    <div>
      <ExplorerControlPanel folder={folder} />
      <Divider
        css={css`
          margin: 12px 0 24px;
        `}
      />
      <Explorer folder={folder} />
    </div>
  )
}
