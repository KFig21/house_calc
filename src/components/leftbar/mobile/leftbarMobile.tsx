import React, { useState } from 'react';
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
import './leftbarMobile.scss';
import HouseInput from '../components/inputs/houseInput';
import CalcTypeInput from '../components/inputs/calcTypeInput';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const LeftBarMobile: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className={`leftbar-mobile ${showMenu ? 'show' : 'hide'}`}>
        <span className="lever" onClick={() => setShowMenu(!showMenu)}>
          <KeyboardArrowUpIcon className="icon" />
        </span>
        <div className="leftbar-mobile-container">
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
      </div>
      <div
        className={`leftbar-mobile-background ${showMenu ? 'show' : 'hide'}`}
        onClick={() => setShowMenu(!showMenu)}
      ></div>
    </>
  );
};

export default LeftBarMobile;
