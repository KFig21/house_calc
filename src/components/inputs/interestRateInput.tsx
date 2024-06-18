import React from 'react';
import './inputs.scss';
import CircleButton from '../buttons/circleButton';

interface InterestRateInputProps {
  value: number;
  onChange: (value: number) => void;
}

const InterestRateInput: React.FC<InterestRateInputProps> = ({
  value,
  onChange,
}) => {
  const handleDecrease = () => {
    onChange(Math.max(0, parseFloat((value - 0.1).toFixed(2))));
  };

  const handleIncrease = () => {
    onChange(parseFloat((value + 0.1).toFixed(2)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Interest Rate (%):</label>
      <div className="input-container">
        <CircleButton
          onClick={value > 0 ? handleDecrease : undefined}
          disabled={value <= 0}
          text="-"
        />
        <input
          type="number"
          step="0.01"
          value={value}
          onChange={handleChange}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default InterestRateInput;
