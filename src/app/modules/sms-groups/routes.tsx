import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutSplashScreen } from '@/_metronic/layout/core';
import { Group } from './components/Groups';
import { Create } from './components/Create';
import { Modify } from './components/Modify';
import { View } from './components/View';

const GroupsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <Group />} />
        <Route path='/create' Component={(props) => <Create />} />
        <Route path='/show/:id' Component={(props) => <View />} />
        <Route path='/edit/:id' Component={(props) => <Modify />} />
      </Routes>
    </Suspense>
  );
};

export default GroupsRoutes;
