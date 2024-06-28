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
import HouseInput from './inputs/houseInput';
import CalcTypeInput from './inputs/calcTypeInput';
import ThemeToggleButton from '../buttons/themeToggle/themeToggle';
import Logo from '../header/logo/logo';
import Footer from './footer/footer';

const LeftBar: React.FC = () => {
  return (
    <div className="leftbar">
      <div className="header">
        <div className="header-upper">
          <Logo />
          <div className="header-text">CalcHouse</div>
        </div>
        <div className="header-subtext">
          Home Buying Budget & Mortgage Calculator
        </div>
      </div>
      <div className="leftbar-container">
        <CalcTypeInput />
        <div className="break"></div>
        <HouseInput />
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
      <Footer />
      <ThemeToggleButton />
    </div>
  );
};

export default LeftBar;
