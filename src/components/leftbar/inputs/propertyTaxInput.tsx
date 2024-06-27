import React, { useState, useEffect } from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';
import {
  formatNumberWithCommas,
  parseCommaSeparatedNumber,
} from '../../../utils/utils';

const PropertyTaxInput: React.FC = () => {
  const { propertyTaxRate, setPropertyTaxRate } = useAppContext();
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumberWithCommas(propertyTaxRate)
  );

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(propertyTaxRate));
  }, [propertyTaxRate]);

  const handleDecrease = () => {
    const newValue = Math.max(0, parseInt((propertyTaxRate - 100).toFixed(0)));
    setPropertyTaxRate(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleIncrease = () => {
    const newValue = parseInt((propertyTaxRate + 100).toFixed(0));
    setPropertyTaxRate(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCommaSeparatedNumber(e.target.value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setPropertyTaxRate(numericValue);
      setDisplayValue(formatNumberWithCommas(numericValue));
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
          type="text"
          value={displayValue}
          onChange={handleChange}
          min={0}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default PropertyTaxInput;
