import React from 'react';
import { useAppContext } from '../../../../contexts/appContext';
import './amortization.scss';
import { AmortizationScheduleEntry } from '../../../../utils/ammortizationCalc';

const AmortizationSchedule: React.FC = () => {
  const { amortizationSchedule } = useAppContext();

  const year = (data: AmortizationScheduleEntry) => {
    const annual_mortgage = (amortizationSchedule?.monthly_Mortgage || 0) * 12;
    const fees_Height =
      (((amortizationSchedule?.monthly_Fees || 0) * 12) / annual_mortgage) *
      100;
    const interest_Height = (data.interest / annual_mortgage) * 100;
    const principal_Height = (data.principal / annual_mortgage) * 100;

    console.log('y', data, ' | annual mortgage: ', annual_mortgage);
    return (
      <div className="year">
        <div style={{ height: `${fees_Height}%` }} className="tax bar"></div>
        <div
          style={{ height: `${interest_Height}%` }}
          className="interest bar"
        ></div>
        <div
          style={{ height: `${principal_Height}%` }}
          className="principal bar"
        ></div>
      </div>
    );
  };

  return (
    <div className="am-container">
      <div className="title">Mortgage Payment Info</div>
      <div className="table">
        {amortizationSchedule?.data.map((y) => year(y))}
      </div>
    </div>
  );
};

export default AmortizationSchedule;
