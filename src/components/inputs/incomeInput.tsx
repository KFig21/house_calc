import React from 'react';
import './inputs.scss';

interface IncomeInputProps {
  value: number;
  onChange: (value: number) => void;
}

const IncomeInput: React.FC<IncomeInputProps> = ({ value, onChange }) => {
  const handleDecrease = () => {
    if (value > 1000) {
      onChange(value - 1000);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>
        Annual Income:
        <div className="input-container">
          <button
            className="circle-button"
            onClick={handleDecrease}
            disabled={value <= 1000}
          >
            -
          </button>
          <input type="number" value={value} onChange={handleChange} />
          <button className="circle-button" onClick={handleIncrease}>
            +
          </button>
        </div>
      </label>
    </div>
  );
};

export default IncomeInput;
