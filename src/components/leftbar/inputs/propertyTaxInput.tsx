import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const PropertyTaxInput: React.FC = () => {
  const { propertyTaxRate, setPropertyTaxRate } = useAppContext();

  const handleDecrease = () => {
    setPropertyTaxRate(
      Math.max(0, parseInt((propertyTaxRate - 100).toFixed(0)))
    );
  };

  const handleIncrease = () => {
    setPropertyTaxRate(parseInt((propertyTaxRate + 100).toFixed(0)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setPropertyTaxRate(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Property Tax (annual)</label>
      <div className="input-container">
        <CircleButton
          onClick={propertyTaxRate > 0 ? handleDecrease : undefined}
          disabled={propertyTaxRate <= 0}
          text="-"
        />
        <input
          type="number"
          step="100"
          value={propertyTaxRate}
          onChange={handleChange}
          min={0}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default PropertyTaxInput;
