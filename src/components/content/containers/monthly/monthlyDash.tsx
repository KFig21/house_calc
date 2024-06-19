import React from 'react';
import './monthlyDash.scss';
import { useAppContext } from '../../../../contexts/appContext';
import { formatToWholeDollarAmount } from '../../../../utils/utils';

const MonthlyDash: React.FC = () => {
  const { monthlyBreakdown } = useAppContext();

  return (
    <div className="monthly-container">
      <div className="title">Monthly Breakdown</div>
      <div className="breakdown">
        {/* finances */}
        <div className="breakdown-section">
          <div className="breakdown-header">Finances</div>
          <div className="breakdown-element">
            <div className="el-name">Housing</div>
            <div className="el-value">
              {formatToWholeDollarAmount(monthlyBreakdown?.finances.housing)}
            </div>
          </div>
          <div className="breakdown-element">
            <div className="el-name">Debts</div>
            <div className="el-value">
              {formatToWholeDollarAmount(monthlyBreakdown?.finances.debt)}
            </div>
          </div>
          <div className="breakdown-element">
            <div className="el-name">Expenses & Savings</div>
            <div className="el-value">
              {formatToWholeDollarAmount(monthlyBreakdown?.finances.expenses)}
            </div>
          </div>
          <div className="breakdown-element">
            <div className="el-name">Income Tax</div>
            <div className="el-value">
              {formatToWholeDollarAmount(monthlyBreakdown?.finances.taxes)}
            </div>
          </div>
        </div>
        {/* payment breakdown */}
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
        </div>
      </div>
    </div>
  );
};

export default MonthlyDash;
