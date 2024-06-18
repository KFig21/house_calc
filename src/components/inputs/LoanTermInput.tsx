import React from 'react';
import './inputs.scss';

interface LoanTermInputProps {
  value: number;
  onChange: (value: number) => void;
}

const LoanTermInput: React.FC<LoanTermInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="horizontal-input">
      <label>Loan Term (years):</label>
      <div className="input-container">
        <select value={value} onChange={handleChange}>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default LoanTermInput;
