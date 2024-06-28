import React from 'react';
import { useAppContext } from '../../../../../contexts/appContext';
import '../breakdown.scss';
import { formatToWholeDollarAmount } from '../../../../../utils/utils';

const TotalBreakdown: React.FC = () => {
  const { results } = useAppContext();

  return (
    <div className="breakdown-section">
      <div className="breakdown-header">Total</div>
      {/* house */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">House</div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.housePrice)}
        </div>
      </div>
      {/* interest */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Interest</div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.totalInterest)}
        </div>
      </div>
      {/* taxes */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Property Taxes</div>
          <div className="el-percentage"></div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.totalPropertyTax)}
        </div>
      </div>
      {/* total fees */}
      <div className="breakdown-element ">
        <div className="el-name">Total Fees</div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.totalHOA + results.totalInsurance)}
        </div>
      </div>
      {/* closing cost */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Closing Costs</div>
          <div className="el-percentage"></div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.closingCost)}
        </div>
      </div>
      {/* TOTAL cost */}
      <div className="breakdown-element income">
        <div className="el-key">
          <div className="el-name">Total Cost</div>
          <div className="el-percentage"></div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.totalCost)}
        </div>
      </div>
    </div>
  );
};

export default TotalBreakdown;
