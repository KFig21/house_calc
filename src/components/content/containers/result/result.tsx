import React from 'react';
import { useAppContext } from '../../../../contexts/appContext';
import './result.scss';

const Result: React.FC = () => {
  const { results } = useAppContext();
  return (
    <>
      {results ? (
        <div className="result-container">
          <h2>Results</h2>
          <p>Down Payment: {results.downPayment}</p>
          <p>Closing Cost: {results.closingCost}</p>
          <p>Max Monthly Payment: {results.maxMonthlyPayment}</p>
          <p>Ideal House Price Range: {results.housePrice}</p>
          <p>Total Interest Paid: {results.totalInterest}</p>
          <p>Total Cost: {results.totalCost}</p>
        </div>
      ) : (
        <span>Loading results</span>
      )}
    </>
  );
};

export default Result;
