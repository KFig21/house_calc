import React from 'react';
import { useAppContext } from '../../../../../contexts/appContext';
import './../breakdown.scss';
import { formatToWholeDollarAmount } from '../../../../../utils/utils';

const FeesBreakdown: React.FC = () => {
  const { results } = useAppContext();

  return (
    <div className="breakdown-section">
      <div className="breakdown-header">Fees</div>
      {/* down payment */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Insurance</div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.totalInsurance)}
        </div>
      </div>
      {/* loan amount */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">HOA Fees</div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.totalHOA)}
        </div>
      </div>
      {/* house cost */}
      <div className="breakdown-element income">
        <div className="el-name">Total Fees</div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.totalHOA + results.totalInsurance)}
        </div>
      </div>
    </div>
  );
};

export default FeesBreakdown;
