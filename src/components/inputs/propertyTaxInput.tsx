import React from 'react';
import './inputs.scss';

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
            min={0}
          />
          <button className="circle-button" onClick={handleIncrease}>
            +
          </button>
        </div>
      </label>
    </div>
  );
};

export default PropertyTaxInput;
