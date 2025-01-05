import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import {TransferMoney} from './components/TransferMoney';
import {RefundMoney} from './components/RefundMoney';
import { TransferReport } from './components/TransferReport';
import { RefundMoneyWithAcc } from './components/RefundMoneywithAcc';
import { Doctors } from './components/Doctors';

const DoctorsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/transfer' Component={(props) => <TransferMoney />} />
        <Route path='/refund-acc' Component={(props) => <RefundMoneyWithAcc/>} />
        <Route path='/refund' Component={(props) => <RefundMoney />} />
        <Route path='/report' Component={(props) => <TransferReport />} />
        <Route path='/' Component={(props) => <Doctors />} />
      </Routes>
    </Suspense>
  );
};

export default DoctorsRoutes;
