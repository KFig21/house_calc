import React from 'react';
import DownPaymentInput from '../components/inputs/downPaymentInput';
import IncomeInput from '../components/inputs/incomeInput';
import InterestRateInput from '../components/inputs/interestRateInput';
import MonthlyDebtsInput from '../components/inputs/monthlyDebts';
import PropertyTaxInput from '../components/inputs/propertyTaxInput';
import HomeInsuranceInput from '../components/inputs/homeInsuranceInput';
import HoaFeesInput from '../components/inputs/hoaFeesInput';
import LoanTermInput from '../components/inputs/LoanTermInput';
import ClosingCostsInput from '../components/inputs/closingCostsInput';
import IncomeTaxRateInput from '../components/inputs/incomeTaxInput';
import DeductCCfomDPinput from '../components/inputs/dedcuctCCfromDPinput';
import './leftbar.scss';
import HouseInput from '../components/inputs/houseInput';
import CalcTypeInput from '../components/inputs/calcTypeInput';
import ThemeToggleButton from '../../buttons/themeToggle/themeToggle';
import Logo from '../../header/logo/logo';

const LeftBarDesktop: React.FC = () => {
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
      {/* <Footer /> */}
      <ThemeToggleButton type="dekstop" />
    </div>
  );
};

export default LeftBarDesktop;
