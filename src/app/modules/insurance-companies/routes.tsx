import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import { Patients } from './components/InsuranceCompanies';

const PatientsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <Patients />} />
      </Routes>
    </Suspense>
  );
};

export default PatientsRoutes;
