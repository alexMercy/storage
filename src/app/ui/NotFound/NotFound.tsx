import { Button, Result } from 'antd'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/disk')}>
          Back Home
        </Button>
      }
    />
  )
}
