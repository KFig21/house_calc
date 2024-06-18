import React from 'react';
import './inputs.scss';
import CircleButton from '../buttons/circleButton';

interface MonthlyDebtsInputProps {
  value: number;
  onChange: (value: number) => void;
}

const MonthlyDebtsInput: React.FC<MonthlyDebtsInputProps> = ({
  value,
  onChange,
}) => {
  const handleDecrease = () => {
    onChange(Math.max(0, value - 100));
  };

  const handleIncrease = () => {
    onChange(Math.min(99999, value + 100));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99999) {
      onChange(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Monthly Debts:</label>
      <div className="input-container">
        <CircleButton
          onClick={value > 0 ? handleDecrease : undefined}
          disabled={value <= 0}
          text="-"
        />
        <input
          type="number"
          value={value}
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
