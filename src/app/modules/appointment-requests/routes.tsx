import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutSplashScreen } from '@/_metronic/layout/core';
import { AppointmentRequests } from './components';
import { View } from './components/View';

const AppointmentRequestsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <AppointmentRequests />} />
                <Route path='/show/:id' Component={(props) => <View />} />
      </Routes>
    </Suspense>
  );
};

export default AppointmentRequestsRoutes;
