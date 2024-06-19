import React from 'react';
import './app.scss';
import { AppProvider } from './contexts/appContext';
import IncomeInput from './components/leftbar/inputs/incomeInput';
import DownPaymentInput from './components/leftbar/inputs/downPaymentInput';
import InterestRateInput from './components/leftbar/inputs/interestRateInput';
import MonthlyDebtsInput from './components/leftbar/inputs/monthlyDebts';
import PropertyTaxInput from './components/leftbar/inputs/propertyTaxInput';
import HomeInsuranceInput from './components/leftbar/inputs/homeInsuranceInput';
import HoaFeesInput from './components/leftbar/inputs/hoaFeesInput';
import LoanTermInput from './components/leftbar/inputs/LoanTermInput';
import Header from './components/header/header';
import ClosingCostsInput from './components/leftbar/inputs/closingCostsInput';
import DtiInput from './components/content/inputs/dtiSlider';
import ResultsComponent from './components/content/containers/results_WIP';
import MonthlyDash from './components/content/containers/monthly/monthlyDash';
import IncomeTaxRateInput from './components/leftbar/inputs/incomeTaxInput';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="leftbar">
          <div className="form-container">
            <IncomeInput />
            <DownPaymentInput />
            <LoanTermInput />
            <InterestRateInput />
            <MonthlyDebtsInput />
            <PropertyTaxInput />
            <HomeInsuranceInput />
            <HoaFeesInput />
            <ClosingCostsInput />
            <IncomeTaxRateInput />
            <DtiInput />
          </div>
        </div>
        <div className="dashboard">
          <MonthlyDash />
          {/* <ResultsComponent /> */}
        </div>
      </div>
    </div>
  );
};

const WrappedApp: React.FC = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default WrappedApp;
