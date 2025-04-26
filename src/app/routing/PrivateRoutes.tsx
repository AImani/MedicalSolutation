import { FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import DoctorsRoutes from '../modules/doctors/routes'
import PatientsRoutes from '../modules/patients/routes'
import GroupsRoutes from '../modules/groups/routes'
import MessagesRoutes from '../modules/messages/routes'
import { AppointmentRequests } from '../modules/appointment-requests/components'
import { Appointments } from '../modules/appointments/components/Appointments'
import { InsuranceCompanies } from '../modules/insurance-companies/components/InsuranceCompanies'
import BasicInfoRoutes from '../modules/basic-infos/routes'
import AppointmentsRoutes from '../modules/appointments/routes'
import AppointmentRequestsRoutes from '../modules/appointment-requests/routes'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />

        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />

        <Route
          path='doctors/*'
          element={<DoctorsRoutes />}
        />
        <Route
          path='patients/*'
          element={<PatientsRoutes />}
        />
        <Route
          path='appointment-requests/*'
          element={<AppointmentRequestsRoutes />}
        />
        <Route
          path='insurance-companies/*'
          element={<InsuranceCompanies />}
        />
        <Route
          path='appointments/*'
          element={<Appointments />}
        />
        <Route
          path='basic-info/*'
          element={<BasicInfoRoutes />}
        />
        <Route
          path='sms-panel/groups/*'
          element={<GroupsRoutes />}
        />
        <Route
          path='sms-panel/messages/*'
          element={<MessagesRoutes />}
        />
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
