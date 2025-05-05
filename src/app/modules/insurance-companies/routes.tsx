import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutSplashScreen } from '@/_metronic/layout/core';
import { InsuranceCompanies } from './components/InsuranceCompanies';
import { InsuranceCompany } from './components/InsuranceCompany';

const InsuranceCompaniesRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/' Component={(props) => <InsuranceCompanies />} />
        <Route path='/show/:id' Component={(props) => <InsuranceCompany />} />
        <Route path='/create' Component={(props) => <InsuranceCompany />} />
        <Route path='/edit/:id' Component={(props) => <InsuranceCompany />} />
      </Routes>
    </Suspense>
  );
};

export default InsuranceCompaniesRoutes;
