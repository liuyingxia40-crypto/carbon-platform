import { Navigate, createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import HomePage from '../pages/HomePage'
import DemoPage from '../pages/DemoPage'
import ReportPage from '../pages/ReportPage'
import PlatformPage from '../pages/PlatformPage'
import { ROUTES } from './paths'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.home} replace /> },
  {
    path: ROUTES.home,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'demo', element: <DemoPage /> },
      { path: 'report', element: <ReportPage /> },
      { path: 'platform', element: <PlatformPage /> },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.home} replace /> },
])
