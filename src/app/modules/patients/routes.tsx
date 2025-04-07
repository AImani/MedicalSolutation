import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import { Patients } from './components/Patients';
import Patient from './components/Patient';
import { Create } from './components/Create';
import { Modify } from './components/Modify';
import { View } from './components/View';

const PatientsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <Patients />} />
        <Route path='/create' Component={(props) => <Create />} />
        <Route path='/show/:id' Component={(props) => <View />} />
        <Route path='/edit/:id' Component={(props) => <Modify />} />
      </Routes>
    </Suspense>
  );
};

export default PatientsRoutes;
