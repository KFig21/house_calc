import React, { useState, useEffect } from 'react';
import './inputs.scss';
import CircleButton from '../../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../../contexts/appContext';
import {
  formatNumberWithCommas,
  parseCommaSeparatedNumber,
} from '../../../../utils/utils';

const HouseInput: React.FC = () => {
  const { houseValue, setHouseValue, calcType, results } = useAppContext();
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumberWithCommas(houseValue)
  );

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(houseValue));
  }, [houseValue]);

  const handleDecrease = () => {
    if (houseValue > 1000) {
      const newValue = houseValue - 1000;
      setHouseValue(newValue);
      setDisplayValue(formatNumberWithCommas(newValue));
    }
  };

  const handleIncrease = () => {
    const newValue = houseValue + 1000;
    setHouseValue(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCommaSeparatedNumber(e.target.value);
    if (!isNaN(numericValue)) {
      setHouseValue(numericValue);
      setDisplayValue(formatNumberWithCommas(numericValue));
    }
  };

  return (
    <div className={`horizontal-input ${calcType && 'disabled'}`}>
      <label>Home Value</label>
      <div className="input-container">
        <CircleButton
          onClick={houseValue > 1000 ? handleDecrease : undefined}
          disabled={houseValue <= 1000 || calcType}
          text="-"
        />
        <input
          type="text"
          value={
            calcType ? formatNumberWithCommas(results.housePrice) : displayValue
          }
          onChange={handleChange}
          disabled={calcType}
        />
        <CircleButton onClick={handleIncrease} disabled={calcType} text="+" />
      </div>
    </div>
  );
};

export default HouseInput;
