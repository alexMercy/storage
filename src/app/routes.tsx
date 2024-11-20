import { AppLayout } from '@/app/ui/Layout/Layout'
import { NotFound } from '@/app/ui/NotFound/NotFound'
import { DiskPage } from '@/pages/Disk'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/disk" /> },
      {
        path: '/disk',
        element: <DiskPage />,
      },
      {
        path: '/disk/:uuid',
        element: <DiskPage />,
      },
      {
        path: '/trash',
        element: <p>Trash Works</p>,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
