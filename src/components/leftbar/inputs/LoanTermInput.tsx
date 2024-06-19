import React from 'react';
import './inputs.scss';
import { useAppContext } from '../../../contexts/appContext';

const LoanTermInput: React.FC = () => {
  const { loanTerm, setLoanTerm } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanTerm(parseInt(e.target.value, 10));
  };

  return (
    <div className="horizontal-input">
      <label>Loan Term (years):</label>
      <div className="input-container">
        <select value={loanTerm} onChange={handleChange}>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default LoanTermInput;
