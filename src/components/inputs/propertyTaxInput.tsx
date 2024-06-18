import React from 'react';
import './inputs.scss';
import CircleButton from '../buttons/circleButton';

interface PropertyTaxInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PropertyTaxInput: React.FC<PropertyTaxInputProps> = ({
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
    if (!isNaN(newValue) && newValue >= 0) {
      onChange(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>
        Property Tax Rate (%):
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
            min={0}
          />
          <CircleButton onClick={handleIncrease} disabled={false} text="+" />
        </div>
      </label>
    </div>
  );
};

export default PropertyTaxInput;
