import React from 'react';
import DownPaymentInput from './inputs/downPaymentInput';
import IncomeInput from './inputs/incomeInput';
import InterestRateInput from './inputs/interestRateInput';
import MonthlyDebtsInput from './inputs/monthlyDebts';
import PropertyTaxInput from './inputs/propertyTaxInput';
import HomeInsuranceInput from './inputs/homeInsuranceInput';
import HoaFeesInput from './inputs/hoaFeesInput';
import LoanTermInput from './inputs/LoanTermInput';
import ClosingCostsInput from './inputs/closingCostsInput';
import IncomeTaxRateInput from './inputs/incomeTaxInput';
import DeductCCfomDPinput from './inputs/dedcuctCCfromDPinput';
import './leftbar.scss';

const LeftBar: React.FC = () => {
  return (
    <div className="leftbar">
      <div className="leftbar-contaier">
        <IncomeInput />
        <DownPaymentInput />
        <LoanTermInput />
        <InterestRateInput />
        <MonthlyDebtsInput />
        <PropertyTaxInput />
        <HomeInsuranceInput />
        <HoaFeesInput />
        <ClosingCostsInput />
        <DeductCCfomDPinput />
        <IncomeTaxRateInput />
      </div>
    </div>
  );
};

export default LeftBar;
