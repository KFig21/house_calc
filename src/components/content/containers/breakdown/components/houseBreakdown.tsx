import React from 'react';
import { useAppContext } from '../../../../../contexts/appContext';
import '../breakdown.scss';
import { formatToWholeDollarAmount } from '../../../../../utils/utils';

const HouseBreakdown: React.FC = () => {
  const { results } = useAppContext();

  return (
    <div className="breakdown-section">
      <div className="breakdown-header">House</div>
      {/* down payment */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Down Payment</div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.downPayment)}
        </div>
      </div>
      {/* loan amount */}
      <div className="breakdown-element">
        <div className="el-key">
          <div className="el-name">Loan Amount</div>
        </div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.loanAmount)}
        </div>
      </div>
      {/* house cost */}
      <div className="breakdown-element income">
        <div className="el-name">House Cost</div>
        <div className="el-value">
          {formatToWholeDollarAmount(results.housePrice)}
        </div>
      </div>
    </div>
  );
};

export default HouseBreakdown;
