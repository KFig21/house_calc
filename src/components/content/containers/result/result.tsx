import React from 'react';
import { useAppContext } from '../../../../contexts/appContext';
import './result.scss';

const Result: React.FC = () => {
  const { results } = useAppContext();
  return (
    <>
      {results ? (
        <div className="result-container">
          <div className="title">Results</div>
          <div>Down Payment: {results.downPayment}</div>
          <div>Closing Cost: {results.closingCost}</div>
          <div>Max Monthly Payment: {results.maxMonthlyPayment}</div>
          <div>Ideal House Price Range: {results.housePrice}</div>
          <div>Total Interest Paid: {results.totalInterest}</div>
          <div>Total Cost: {results.totalCost}</div>
        </div>
      ) : (
        <span>Loading results</span>
      )}
    </>
  );
};

export default Result;
