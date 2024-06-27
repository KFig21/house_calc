import React, { useEffect, useState } from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';
import {
  formatNumberWithCommas,
  parseCommaSeparatedNumber,
} from '../../../utils/utils';

const HoaFeesInput: React.FC = () => {
  const { hoaFees, setHoaFees } = useAppContext();
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumberWithCommas(hoaFees)
  );

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(hoaFees));
  }, [hoaFees]);

  const handleDecrease = () => {
    const newValue = Math.max(0, hoaFees - 50);
    setHoaFees(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleIncrease = () => {
    const newValue = Math.min(99999, hoaFees + 50);
    setHoaFees(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCommaSeparatedNumber(e.target.value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99999) {
      setHoaFees(numericValue);
      setDisplayValue(formatNumberWithCommas(numericValue));
    }
  };

  return (
    <div className="horizontal-input">
      <label>HOA Fees</label>
      <div className="input-container">
        <CircleButton
          onClick={hoaFees > 0 ? handleDecrease : undefined}
          disabled={hoaFees <= 0}
          text="-"
        />
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          min={0}
          max={99999}
        />
        <CircleButton
          onClick={hoaFees < 99900 ? handleIncrease : undefined}
          disabled={hoaFees > 99900}
          text="+"
        />
      </div>
    </div>
  );
};

export default HoaFeesInput;
