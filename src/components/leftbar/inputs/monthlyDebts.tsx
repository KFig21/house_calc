import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const MonthlyDebtsInput: React.FC = () => {
  const { monthlyDebts, setMonthlyDebts } = useAppContext();

  const handleDecrease = () => {
    setMonthlyDebts(Math.max(0, monthlyDebts - 100));
  };

  const handleIncrease = () => {
    setMonthlyDebts(Math.min(99999, monthlyDebts + 100));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99999) {
      setMonthlyDebts(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Monthly Debts:</label>
      <div className="input-container">
        <CircleButton
          onClick={monthlyDebts > 0 ? handleDecrease : undefined}
          disabled={monthlyDebts <= 0}
          text="-"
        />
        <input
          type="number"
          value={monthlyDebts}
          onChange={handleChange}
          min={0}
          max={99999}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default MonthlyDebtsInput;
