import { Card, Grid } from 'antd'
import { capitalize } from 'lodash'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

const { useBreakpoint } = Grid
export const DiskPage: FC = () => {
  const { t } = useTranslation()
  const screens = useBreakpoint()

  return (
    <div>
      {capitalize(t('disk'))}
      <Card title="card titles" />
    </div>
  )
}
