import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import {Message} from './components/Messages';
import {GroupSendCreate} from './components/GroupSendCreate';
import {SingleSendCreate} from './components/SingleSendCreate';

const MessagesRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <Message />} />
        <Route path='/single-send/create' Component={(props) => <SingleSendCreate />} />
        <Route path='/group-send/create' Component={(props) => <GroupSendCreate />} />
      </Routes>
    </Suspense>
  );
};

export default MessagesRoutes;
