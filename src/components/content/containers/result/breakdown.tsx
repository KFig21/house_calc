import React from 'react';
import { useAppContext } from '../../../../contexts/appContext';
import './breakdown.scss';
import { formatToWholeDollarAmount } from '../../../../utils/utils';

const Breakdown: React.FC = () => {
  const { results } = useAppContext();
  return (
    <>
      {results ? (
        <div className="breakdown-container">
          <div className="title">
            <span className="key">House price:</span>
            <span className="amount">
              {formatToWholeDollarAmount(results.housePrice)}
            </span>
          </div>
          <div className="breakdown">
            <div className="breakdown-left">
              <div className="breakdown-section">
                {/* HOUSE */}
                {/* HOUSE */}
                {/* HOUSE */}
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
              {/* FEES */}
              {/* FEES */}
              {/* FEES */}
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
                    {formatToWholeDollarAmount(
                      results.totalHOA + results.totalInsurance
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* TOTAL */}
            {/* TOTAL */}
            {/* TOTAL */}
            <div className="breakdown-right">
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
                    {formatToWholeDollarAmount(
                      results.totalHOA + results.totalInsurance
                    )}
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
            </div>
          </div>
        </div>
      ) : (
        <span>Loading results</span>
      )}
    </>
  );
};

export default Breakdown;
