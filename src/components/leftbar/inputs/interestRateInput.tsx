import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const InterestRateInput: React.FC = () => {
  const { interestRate, setInterestRate } = useAppContext();

  const handleDecrease = () => {
    setInterestRate(Math.max(0, parseFloat((interestRate - 0.1).toFixed(2))));
  };

  const handleIncrease = () => {
    setInterestRate(parseFloat((interestRate + 0.1).toFixed(2)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setInterestRate(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Interest Rate (%):</label>
      <div className="input-container">
        <CircleButton
          onClick={interestRate > 0 ? handleDecrease : undefined}
          disabled={interestRate <= 0}
          text="-"
        />
        <input
          type="number"
          step="0.1"
          value={interestRate}
          onChange={handleChange}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default InterestRateInput;
