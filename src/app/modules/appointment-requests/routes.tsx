import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutSplashScreen } from '@/_metronic/layout/core';
import { AppointmentRequests } from './components';

const PatientsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <AppointmentRequests />} />
      </Routes>
    </Suspense>
  );
};

export default PatientsRoutes;
