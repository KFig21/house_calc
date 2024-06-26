import React from 'react';
import './monthlyDash.scss';
import MonthlyFinances from './components/monthlyFinances';
import MonthlyPayments from './components/monthlyPayments';
import DtiInput from './components/inputs/dtiSlider';

const MonthlyDash: React.FC = () => {
  return (
    <div className="monthly-container">
      <div className="breakdown">
        <DtiInput />
        <div className="breakdown-data">
          <MonthlyFinances />
          <MonthlyPayments />
        </div>
      </div>
    </div>
  );
};

export default MonthlyDash;
