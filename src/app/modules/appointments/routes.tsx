import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import { Appointments } from './components/Appointments';

const AppointmentsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <Appointments />} />
      </Routes>
    </Suspense>
  );
};

export default AppointmentsRoutes;
