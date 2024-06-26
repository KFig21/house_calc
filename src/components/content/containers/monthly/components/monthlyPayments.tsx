import React from 'react';
import './../monthlyDash.scss';
import { useAppContext } from '../../../../../contexts/appContext';
import { formatToWholeDollarAmount } from '../../../../../utils/utils';

const MonthlyPayments: React.FC = () => {
  const { monthlyBreakdown } = useAppContext();

  return (
    <div className="breakdown-section">
      <div className="breakdown-header">Payment</div>
      <div className="breakdown-element">
        <div className="el-name">Mortgage</div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.payment.mortgage)}
        </div>
      </div>
      <div className="breakdown-element">
        <div className="el-name">Property Taxes</div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.payment.taxes)}
        </div>
      </div>
      <div className="breakdown-element">
        <div className="el-name">Homeowners Insurance</div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.payment.insurance)}
        </div>
      </div>
      <div className="breakdown-element">
        <div className="el-name">HOA fees</div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.payment.hoa)}
        </div>
      </div>
      <div className="breakdown-element income">
        <div className="el-name">Monthly Payment</div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.finances.housing)}
        </div>
      </div>
    </div>
  );
};

export default MonthlyPayments;
