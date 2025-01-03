import { FC, Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import FinancialRoutes from '../modules/financial/routes'
import SurveyRoutes from '../modules/survey/routes'
import axios from 'axios'
import { setupAxios } from '../modules/auth'
import { RoutePermission } from '../modules/auth/permissions/RoutePermission'
import { AdminCashbackClaim } from '../modules/cashback-claims'
import { AdminGift } from '../modules/gifts'
import { CustomerProfileReport } from '../modules/profile/CustomerProfileReport'

const PrivateRoutes = () => {
  // useEffect(() => {
  //   setupAxios(axios)
  // }, [])
console.log('PrivateRoutes');

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
