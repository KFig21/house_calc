import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const IncomeInput: React.FC = () => {
  const { annualIncome, setAnnualIncome } = useAppContext();

  const handleDecrease = () => {
    if (annualIncome > 1000) {
      setAnnualIncome(annualIncome - 1000);
    }
  };

  const handleIncrease = () => {
    setAnnualIncome(annualIncome + 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setAnnualIncome(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Annual Income</label>
      <div className="input-container">
        <CircleButton
          onClick={annualIncome > 1000 ? handleDecrease : undefined}
          disabled={annualIncome <= 1000}
          text="-"
        />
        <input type="number" value={annualIncome} onChange={handleChange} />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default IncomeInput;
