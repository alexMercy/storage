import { Grid } from 'antd'
import type { FC } from 'react'

const { useBreakpoint } = Grid
export const DiskPage: FC = () => {
  const screens = useBreakpoint()
  console.log(screens)

  return <div>Disk page work</div>
}
