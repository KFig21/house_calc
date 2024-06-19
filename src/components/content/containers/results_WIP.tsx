import React from 'react';
import { useAppContext } from '../../../contexts/appContext';

const ResultsComponent: React.FC = () => {
  const { results } = useAppContext();
  return (
    <>
      {results ? (
        <div>
          <h2>Results</h2>
          <p>Max Monthly Payment: ${results.maxMonthlyPayment}</p>
          <p>Ideal House Price Range: ${results.housePrice}</p>
          <p>Total Interest Paid: ${results.totalInterest}</p>
          <p>Closing Cost: ${results.closingCost}</p>
          <p>Total Cost: ${results.totalCost}</p>
        </div>
      ) : (
        <span>Loading results</span>
      )}
    </>
  );
};

export default ResultsComponent;
