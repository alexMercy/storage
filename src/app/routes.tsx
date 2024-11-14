import { AppLayout } from '@/app/ui/Layout/Layout'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/disk',
        element: <p>disk works</p>,
      },
      {
        path: '/trash',
        element: <p>trash works</p>,
      },
    ],
  },
])
