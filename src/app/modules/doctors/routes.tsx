import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import { Doctors } from './components/Doctors';

const DoctorsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <Doctors />} />
      </Routes>
    </Suspense>
  );
};

export default DoctorsRoutes;
