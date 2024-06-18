import React from 'react';
import './inputs.scss';
import CircleButton from '../buttons/circleButton';

interface DownPaymentInputProps {
  value: number;
  onChange: (value: number) => void;
}

const DownPaymentInput: React.FC<DownPaymentInputProps> = ({
  value,
  onChange,
}) => {
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
      <label>Down Payment Amount:</label>
      <div className="input-container">
        <CircleButton
          onClick={value > 1000 ? handleDecrease : undefined}
          disabled={value <= 1000}
          text="-"
        />
        <input type="number" value={value} onChange={handleChange} />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default DownPaymentInput;
