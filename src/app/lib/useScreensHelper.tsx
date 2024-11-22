import { Grid } from 'antd'
import { useEffect } from 'react'

export const useScreensHelper = () => {
  const screens = Grid.useBreakpoint()

  useEffect(() => {
    console.log(screens)
  }, [screens])
}
