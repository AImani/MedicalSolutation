import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {LayoutSplashScreen} from '@/_metronic/layout/core';
import {TransferMoney} from './components/TransferMoney';
import {RefundMoney} from './components/RefundMoney';
import { TransferReport } from './components/TransferReport';
import { RefundMoneyWithAcc } from './components/RefundMoneywithAcc';
import { Cartable } from './components/Cartable';

const FinancialRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/transfer' Component={(props) => <TransferMoney />} />
        <Route path='/refund-acc' Component={(props) => <RefundMoneyWithAcc/>} />
        <Route path='/refund' Component={(props) => <RefundMoney />} />
        <Route path='/report' Component={(props) => <TransferReport />} />
        <Route path='/cartable' Component={(props) => <Cartable />} />
      </Routes>
    </Suspense>
  );
};

export default FinancialRoutes;
