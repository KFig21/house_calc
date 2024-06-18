import React from 'react';
import './inputs.scss';

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
      <label>
        Interest Rate (%):
        <div className="input-container">
          <button
            className="circle-button"
            onClick={handleDecrease}
            disabled={value <= 0}
          >
            -
          </button>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={handleChange}
          />
          <button className="circle-button" onClick={handleIncrease}>
            +
          </button>
        </div>
      </label>
    </div>
  );
};

export default InterestRateInput;
