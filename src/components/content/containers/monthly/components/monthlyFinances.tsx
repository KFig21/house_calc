import React from 'react';
import './../monthlyDash.scss';
import { useAppContext } from '../../../../../contexts/appContext';
import {
  formatToPercentage,
  formatToWholeDollarAmount,
} from '../../../../../utils/utils';

const MonthlyFinances: React.FC = () => {
  const { monthlyBreakdown, annualIncome } = useAppContext();

  return (
    <div className="breakdown-section">
      <div className="breakdown-header">Finances</div>
      {/* housing */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Housing</div>
          <div className="el-percentage">
            (
            {formatToPercentage(
              (monthlyBreakdown?.finances.housing || 0) / (annualIncome / 12)
            )}
            )
          </div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.finances.housing)}
        </div>
      </div>
      {/* Debts */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Debts</div>
          <div className="el-percentage">
            (
            {formatToPercentage(
              (monthlyBreakdown?.finances.debt || 0) / (annualIncome / 12)
            )}
            )
          </div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.finances.debt)}
        </div>
      </div>
      {/* Expenses & Savings */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Expenses & Savings</div>
          <div className="el-percentage">
            (
            {formatToPercentage(
              (monthlyBreakdown?.finances.expenses || 0) / (annualIncome / 12)
            )}
            )
          </div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.finances.expenses)}
        </div>
      </div>
      {/* Income Tax */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Income Tax</div>
          <div className="el-percentage">
            (
            {formatToPercentage(
              (monthlyBreakdown?.finances.taxes || 0) / (annualIncome / 12)
            )}
            )
          </div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(monthlyBreakdown?.finances.taxes)}
        </div>
      </div>

      {/* Monthly Income */}
      <div className="breakdown-element income">
        <div className="el-name">Monthly Income (Pre-tax)</div>
        <div className="el-value">
          {formatToWholeDollarAmount(annualIncome / 12)}
        </div>
      </div>
    </div>
  );
};

export default MonthlyFinances;
