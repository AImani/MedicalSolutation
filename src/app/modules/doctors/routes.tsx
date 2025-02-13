import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import { Doctors } from './components/Doctors';
import { Create } from './components/Create';

const DoctorsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <Doctors />} />
        <Route path='/create' Component={(props) => <Create />} />
      </Routes>
    </Suspense>
  );
};

export default DoctorsRoutes;
