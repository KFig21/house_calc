import React from 'react';
import './inputs.scss';
import CircleButton from '../buttons/circleButton';

interface HoaFeesInputProps {
  value: number;
  onChange: (value: number) => void;
}

const HoaFeesInput: React.FC<HoaFeesInputProps> = ({ value, onChange }) => {
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
      <label>HOA Fees:</label>
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
        <CircleButton
          onClick={value < 99900 ? handleIncrease : undefined}
          disabled={value > 99900}
          text="+"
        />
      </div>
    </div>
  );
};

export default HoaFeesInput;
